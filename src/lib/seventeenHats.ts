import { BUDGETS, HEARD_FROM, type EnquiryPayload } from "./enquiry";

const BASE = "https://maverickmagicians.17hats.com/perl/client/lead-capture-form";
const FORM_ID = process.env.SEVENTEEN_HATS_FORM_ID ?? "pkzkfvbvdnrfrzrcffshktcbcknxxvfw";

type Question = {
  id: number;
  question: string;
  type: string;
  maps_to: string;
  options: { option: string }[];
};

type FormDefinition = { questions: Question[] };

let cache: { at: number; form: FormDefinition } | null = null;

async function loadForm(): Promise<FormDefinition> {
  if (cache && Date.now() - cache.at < 60 * 60 * 1000) return cache.form;
  const res = await fetch(`${BASE}/${FORM_ID}`, {
    headers: { Accept: "application/json" },
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`17hats form lookup failed (${res.status})`);
  const form = (await res.json()) as FormDefinition;
  if (!form.questions?.length) throw new Error("17hats form has no questions");
  cache = { at: Date.now(), form };
  return form;
}

const plain = (html: string) =>
  html.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ").trim().toLowerCase();

function find(form: FormDefinition, test: (q: Question, text: string) => boolean) {
  const match = form.questions.find((q) => test(q, plain(q.question)));
  if (!match) throw new Error("17hats form changed: a question could not be matched");
  return match;
}

// Our option lists mirror 17hats's, in the same order, so we send 17hats's own
// wording (typos and trailing spaces included) and not ours.
function pick(question: Question, ours: readonly string[], value: string) {
  if (!value) return "";
  const index = ours.indexOf(value);
  return question.options.length === ours.length && index >= 0
    ? question.options[index].option
    : value;
}

export async function submitToSeventeenHats(data: EnquiryPayload) {
  const form = await loadForm();

  const name = find(form, (q) => q.maps_to === "name");
  const email = find(form, (q) => q.maps_to === "email");
  const phone = find(form, (q) => q.maps_to === "phone");
  const date = find(form, (q) => q.maps_to === "job_date");
  const location = find(form, (q) => q.maps_to === "" && q.type === "input" && /location/.test(plain(q.question)));
  const budget = find(form, (q) => q.type === "select" && /budget/.test(plain(q.question)));
  const heard = find(form, (q) => q.type === "select" && /find/.test(plain(q.question)));
  const message = find(form, (q) => q.type === "text");

  const answers = [
    { question: name.id, answer: data.name },
    { question: email.id, answer: data.email },
    { question: phone.id, answer: data.phone },
    {
      question: date.id,
      answer: { orig: data.date, formatted: `${data.date}T00:00:00` },
    },
    { question: location.id, answer: data.location },
    { question: budget.id, answer: pick(budget, BUDGETS, data.budget) },
    { question: heard.id, answer: pick(heard, HEARD_FROM, data.heardFrom) },
    // 17hats has no event-type question, so it travels at the top of the message.
    {
      question: message.id,
      answer: `Event type: ${data.eventType}${data.message ? `\n\n${data.message}` : ""}`,
    },
  ];

  const res = await fetch(`${BASE}/${FORM_ID}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ answers }),
  });
  if (!res.ok) {
    throw new Error(`17hats submit failed (${res.status}): ${(await res.text()).slice(0, 300)}`);
  }
}

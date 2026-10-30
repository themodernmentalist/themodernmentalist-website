export const EVENT_TYPES = ["Corporate", "Private party", "Wedding"] as const;

// Preselected on the Christmas landing page only; travels in the message like the others.
export const CHRISTMAS_EVENT_TYPE = "Company Christmas party";

// Same options, in the same order, as the 17hats lead capture form.
export const BUDGETS = [
  "Up to £1500",
  "£1500–£2500",
  "£2500–£4000",
  "£4000 plus",
  "Not sure yet",
] as const;

export const HEARD_FROM = [
  "Met him at an event",
  "Referral",
  "Event planner recommendation",
  "Google",
  "Instagram",
  "Other",
] as const;

export type EnquiryPayload = {
  name: string;
  email: string;
  eventType: string;
  phone: string;
  date: string;
  location: string;
  budget: string;
  heardFrom: string;
  message: string;
  // spam traps
  company: string;
  elapsed: number;
};

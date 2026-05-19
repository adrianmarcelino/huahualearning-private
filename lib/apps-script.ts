const ENDPOINT =
  "https://script.google.com/macros/s/AKfycbzSngb26-EsxyTmgl2nH4xad7IZntc7VGvbnZvLaJq3rkR5Jf9sjN_U-XOBtnefDkjZ5g/exec";

export type LeadPayload = {
  lead_id: string;
  name: string;
  whatsapp: string;
  goal: string;
  level: string;
  group_size: string;
  timing: string;
  notes: string;
  variant: "A" | "B";
  source: "private_subdomain";
  ad_id?: string;
};

export async function submitLead(payload: Omit<LeadPayload, "source"> & { source?: "private_subdomain" }) {
  const body = { action: "private_lead", source: "private_subdomain", ...payload };
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify(body)
  });
  return res.ok;
}

export function genLeadId() {
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `LEAD-${Date.now()}-${rand}`;
}

export function isValidIndoPhone(v: string) {
  const s = v.replace(/[\s-]/g, "");
  return /^(\+62|62|08)\d{7,12}$/.test(s);
}

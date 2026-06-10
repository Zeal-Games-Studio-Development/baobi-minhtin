import { NextResponse } from "next/server";

const CUSTOMER_REQUEST_ENDPOINT =
  "https://cms.minhtinjsc.com/items/customer_requests";

type CustomerRequestPayload = {
  contactor?: unknown;
  email?: unknown;
  phone?: unknown;
  content?: unknown;
};

type ValidCustomerRequest = {
  contactor: string;
  email: string;
  phone: string;
  content: string;
};

export async function POST(request: Request) {
  let body: CustomerRequestPayload;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { message: "Dữ liệu gửi lên chưa đúng định dạng." },
      { status: 400 },
    );
  }

  const result = validateCustomerRequest(body);
  if (!result.ok) {
    return NextResponse.json({ errors: result.errors }, { status: 400 });
  }

  const response = await fetch(CUSTOMER_REQUEST_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(result.data),
  });

  if (!response.ok) {
    return NextResponse.json(
      { message: "Không thể gửi yêu cầu đến CMS." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}

function validateCustomerRequest(payload: CustomerRequestPayload):
  | { ok: true; data: ValidCustomerRequest }
  | { ok: false; errors: Partial<Record<keyof ValidCustomerRequest, string>> } {
  const data: ValidCustomerRequest = {
    contactor: typeof payload.contactor === "string" ? payload.contactor.trim() : "",
    email: typeof payload.email === "string" ? payload.email.trim() : "",
    phone: typeof payload.phone === "string" ? payload.phone.trim() : "",
    content: typeof payload.content === "string" ? payload.content.trim() : "",
  };
  const errors: Partial<Record<keyof ValidCustomerRequest, string>> = {};

  if (!data.contactor) {
    errors.contactor = "Vui lòng nhập họ tên hoặc tên doanh nghiệp.";
  }

  if (!data.email) {
    errors.email = "Vui lòng nhập email liên hệ.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Email chưa đúng định dạng.";
  }

  const phoneDigits = data.phone.replace(/\D/g, "");
  if (!data.phone) {
    errors.phone = "Vui lòng nhập số điện thoại.";
  } else if (!/^[0-9+().\s-]+$/.test(data.phone) || phoneDigits.length < 9 || phoneDigits.length > 15) {
    errors.phone = "Số điện thoại chưa đúng định dạng.";
  }

  if (!data.content) {
    errors.content = "Vui lòng nhập nội dung yêu cầu.";
  }

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }

  return { ok: true, data };
}

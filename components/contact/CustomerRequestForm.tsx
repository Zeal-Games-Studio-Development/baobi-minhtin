"use client";

import { useState } from "react";
import { Send } from "lucide-react";

const CUSTOMER_REQUEST_ENDPOINT = "/api/customer-requests";

type FormValues = {
  contactor: string;
  email: string;
  phone: string;
  content: string;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;
type TouchedFields = Partial<Record<keyof FormValues, boolean>>;

const initialValues: FormValues = {
  contactor: "",
  email: "",
  phone: "",
  content: "",
};

export default function CustomerRequestForm() {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<TouchedFields>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const field = event.target.name as keyof FormValues;
    const value = field === "phone" ? sanitizePhone(event.target.value) : event.target.value;
    const nextValues = { ...values, [field]: value };

    setValues(nextValues);
    if (touched[field]) {
      setErrors((current) => ({ ...current, [field]: validateField(field, nextValues[field].trim()) }));
    }
    if (status !== "idle") setStatus("idle");
  };

  const handleBlur = (
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const field = event.target.name as keyof FormValues;
    setTouched((current) => ({ ...current, [field]: true }));
    setErrors((current) => ({ ...current, [field]: validateField(field, values[field].trim()) }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const payload: FormValues = {
      contactor: values.contactor.trim(),
      email: values.email.trim(),
      phone: values.phone.trim(),
      content: values.content.trim(),
    };
    const validationErrors = validate(payload);
    setTouched({ contactor: true, email: true, phone: true, content: true });
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setStatus("submitting");

    try {
      const response = await fetch(CUSTOMER_REQUEST_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Directus request failed: ${response.status}`);
      }

      setValues(initialValues);
      setTouched({});
      setStatus("success");
    } catch (error) {
      console.error("Customer request submit error:", error);
      setStatus("error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      <Field label="Họ Tên / Tên Doanh Nghiệp *" name="contactor" error={errors.contactor}>
        <input
          id="contactor"
          type="text"
          name="contactor"
          value={values.contactor}
          onChange={handleChange}
          onBlur={handleBlur}
          required
          placeholder="Nhập tên gọi hoặc công ty"
          className={inputClass(errors.contactor)}
          aria-invalid={Boolean(errors.contactor)}
          aria-describedby={errors.contactor ? "contactor-error" : undefined}
          autoComplete="name"
        />
      </Field>

      <Field label="Email Liên Hệ *" name="email" error={errors.email}>
        <input
          id="email"
          type="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          required
          placeholder="sales@example.com"
          className={inputClass(errors.email)}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "email-error" : undefined}
          autoComplete="email"
        />
      </Field>

      <Field label="Số Điện Thoại Zalo/Call *" name="phone" error={errors.phone}>
        <input
          id="phone"
          type="tel"
          name="phone"
          value={values.phone}
          onChange={handleChange}
          onBlur={handleBlur}
          required
          placeholder="09xx xxx xxx"
          className={inputClass(errors.phone)}
          aria-invalid={Boolean(errors.phone)}
          aria-describedby={errors.phone ? "phone-error" : undefined}
          inputMode="tel"
          pattern="[0-9+().\s-]*"
          autoComplete="tel"
        />
      </Field>

      <Field label="Nội Dung Yêu Cầu *" name="content" error={errors.content}>
        <textarea
          id="content"
          rows={5}
          name="content"
          value={values.content}
          onChange={handleChange}
          onBlur={handleBlur}
          required
          placeholder="Bạn cần tư vấn chi tiết về Màng PE, Thùng Carton hay Túi giấy..."
          className={inputClass(errors.content)}
          aria-invalid={Boolean(errors.content)}
          aria-describedby={errors.content ? "content-error" : undefined}
        />
      </Field>

      {status === "success" ? (
        <p className="rounded-md border border-green-200 bg-green-50 px-4 py-3 text-sm font-semibold text-green-700">
          Yêu cầu đã được gửi. Minh Tín sẽ liên hệ lại sớm.
        </p>
      ) : null}

      {status === "error" ? (
        <p className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
          Không thể gửi yêu cầu lúc này. Vui lòng thử lại hoặc liên hệ hotline.
        </p>
      ) : null}

      <button
        type="submit"
        className="btn btn-primary w-full justify-center disabled:cursor-not-allowed disabled:opacity-70"
        style={{ padding: "18px", fontSize: "1.05rem" }}
        disabled={status === "submitting"}
      >
        {status === "submitting" ? "Đang gửi..." : "Gửi Tin Nhắn Ngay"} <Send size={16} />
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  error,
  children,
}: {
  label: string;
  name: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-2 block font-semibold text-navy-900">
        {label}
      </label>
      {children}
      {error ? <p id={`${name}-error`} className="mt-2 text-sm font-semibold text-red-600">{error}</p> : null}
    </div>
  );
}

function inputClass(error?: string): string {
  return ["cf-input", error ? "cf-input-error" : ""].filter(Boolean).join(" ");
}

function sanitizePhone(value: string): string {
  return value.replace(/[^0-9+().\s-]/g, "");
}

function validateField(field: keyof FormValues, value: string): string | undefined {
  if (field === "contactor" && !value) {
    return "Vui lòng nhập họ tên hoặc tên doanh nghiệp.";
  }

  if (field === "email") {
    if (!value) return "Vui lòng nhập email liên hệ.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Email chưa đúng định dạng.";
  }

  if (field === "phone") {
    const phoneDigits = value.replace(/\D/g, "");
    if (!value) return "Vui lòng nhập số điện thoại.";
    if (!/^[0-9+().\s-]+$/.test(value) || phoneDigits.length < 9 || phoneDigits.length > 15) {
      return "Số điện thoại chưa đúng định dạng.";
    }
  }

  if (field === "content" && !value) {
    return "Vui lòng nhập nội dung yêu cầu.";
  }

  return undefined;
}

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};

  for (const field of Object.keys(values) as (keyof FormValues)[]) {
    const error = validateField(field, values[field]);
    if (error) {
      errors[field] = error;
    }
  }

  return errors;
}

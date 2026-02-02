/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useActionState, useEffect } from "react";

import { registerUser } from "@/services/Auth/auth.api";

import { toast } from "sonner";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import InputFieldError from "@/components/shared/InputFieldError";
import PasswordInput from "@/components/shared/PasswordInput";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import GoogleLogin from "./GoogleLogin";

export default function RegisterForm() {
  const [state, formAction, pending] = useActionState(registerUser, null);
  console.log(state);
  useEffect(() => {
    if (state && !state.success && state.message) {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <form action={formAction}>
      <FieldGroup>
        <div className="grid  gap-4">
          {/* Name */}
          <Field>
            <FieldLabel htmlFor="name">Full Name</FieldLabel>
            <Input id="name" name="name" placeholder="John Doe" />
            <InputFieldError field="name" state={state} />
          </Field>

          {/* Email */}
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="example@gmail.com"
            />
            <InputFieldError field="email" state={state} />
          </Field>
          {/* Phone */}
          <Field>
            <FieldLabel htmlFor="phone">Phone</FieldLabel>
            <Input
              id="phone"
              name="phone"
              type="tel"
              placeholder="+1234567890"
            />
            <InputFieldError field="phone" state={state} />
          </Field>

          {/* Password */}
          <Field>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <PasswordInput id="password" name="password" />
            <InputFieldError field="password" state={state} />
          </Field>

          {/* Confirm Password */}
          <Field>
            <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
            <PasswordInput id="confirmPassword" name="confirmPassword" />
            <InputFieldError field="confirmPassword" state={state} />
          </Field>
          {/* Terms and Conditions */}
          <Field>
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" name="terms" value="on" />
              <FieldLabel htmlFor="terms" className=" text-gray-600">
                I accept the{" "}
                <a href="#" className="text-blue-600 hover:underline">
                  Terms and Conditions
                </a>
                .
              </FieldLabel>
            </div>

            <InputFieldError field="terms" state={state} />
          </Field>
        </div>

        <Field className="mt-2">
          <Button type="submit" disabled={pending}>
            {pending ? "Creating Account..." : "Create Account"}
          </Button>
        </Field>
      </FieldGroup>
      <p className="mt-2">
        <GoogleLogin></GoogleLogin>
      </p>
    </form>
  );
}

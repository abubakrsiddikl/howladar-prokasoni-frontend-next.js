/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import InputFieldError from "@/components/shared/InputFieldError";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { loginUser } from "@/services/Auth/auth.api";
import { useActionState, useEffect } from "react";

import { toast } from "sonner";
import GoogleLogin from "./GoogleLogin";

const LoginForm = ({ redirect }: { redirect?: string }) => {
  const [state, formAction, isPending] = useActionState(loginUser, null);
  useEffect(() => {
    if (state && !state.success && state.message) {
      toast.error(state.message);
    }
  }, [state]);
  return (
    <form action={formAction}>
      {redirect && <input type="hidden" name="redirect" value={redirect} />}
      <FieldGroup>
        <div className="grid grid-cols-1 gap-4">
          {/* Email */}
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="m@example.com"
              //   required
            />

            <InputFieldError field="email" state={state} />
          </Field>

          {/* Password */}
          <Field>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              //   required
            />
            <InputFieldError field="password" state={state} />
          </Field>
        </div>
        <FieldGroup className="mt-4">
          <Field>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Logging in..." : "Login"}
            </Button>

            <p className="flex justify-between">
              {/* forget password */}
              <FieldDescription className="px-6 text-center">
                <a
                  href="/forget-password"
                  className="text-blue-600 hover:underline"
                >
                  Forgot password ?
                </a>
              </FieldDescription>
              <FieldDescription className="px-6 text-center">
                <a href="/register" className="text-blue-600 hover:underline">
                  Sign up ?
                </a>
              </FieldDescription>
            </p>
          </Field>
        </FieldGroup>
      </FieldGroup>
      <GoogleLogin></GoogleLogin>
    </form>
  );
};

export default LoginForm;

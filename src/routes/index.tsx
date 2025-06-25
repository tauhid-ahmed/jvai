import { BrowserRouter, Routes, Route } from "react-router-dom";

import {
  HomePage,
  LoginPage,
  SignupPage,
  VerificationCodePage,
  ChatPage,
  HelpAndSupportPage,
  ManageSubscription,
  FAQPage,
  UsersPage,
} from "../pages";

import * as paths from "../paths";

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<ChatPage />} />
        <Route path={paths.landingPath()} element={<HomePage />} />
        <Route path={paths.loginPath()} element={<LoginPage />} />
        <Route path={paths.signupPath()} element={<SignupPage />} />
        <Route
          path={paths.verificationCodePath()}
          element={<VerificationCodePage />}
        />
        <Route
          path={paths.helpAndSupportPath()}
          element={<HelpAndSupportPage />}
        />
        <Route path={paths.usersPath()} element={<UsersPage />} />
        <Route
          path={paths.manageSubscriptionPath()}
          element={<ManageSubscription />}
        />
        <Route path={paths.faqPath()} element={<FAQPage />} />

        {/* The "*" path is a catch-all for any routes that don't match */}
        {/* <Route path="*" element={<NotFoundPage />} /> */}
        {/* </Route> */}
      </Routes>
    </BrowserRouter>
  );
}

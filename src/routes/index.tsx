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
import AuthLayout from "../components/auth-layout";
import ProtectedLayout from "../components/protected-layout";
import ChatLayout from "../components/chat-layout";
import SingleChat from "../pages/chatId";

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={paths.landingPath()} element={<HomePage />} />

        {/* Protected routes */}
        <Route element={<ChatLayout />}>
          <Route element={<ProtectedLayout />}>
            <Route index element={<ChatPage />} />
            <Route path="chat/:chatId" element={<SingleChat />} />

            <Route path={paths.usersPath()} element={<UsersPage />} />
          </Route>
          <Route
            path={paths.helpAndSupportPath()}
            element={<HelpAndSupportPage />}
          />
          <Route
            path={paths.manageSubscriptionPath()}
            element={<ManageSubscription />}
          />
          <Route path={paths.faqPath()} element={<FAQPage />} />
        </Route>

        {/* Auth routes */}
        <Route element={<AuthLayout />}>
          <Route path={paths.loginPath()} element={<LoginPage />} />
          <Route path={paths.signupPath()} element={<SignupPage />} />
          <Route
            path={paths.verificationCodePath()}
            element={<VerificationCodePage />}
          />
        </Route>

        {/* The "*" path is a catch-all for any routes that don't match */}
        {/* <Route path="*" element={<NotFoundPage />} /> */}
        {/* </Route> */}
      </Routes>
    </BrowserRouter>
  );
}

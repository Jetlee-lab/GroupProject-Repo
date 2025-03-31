import { Route, Routes } from "react-router-dom";

import DefaultLayout from "@/layouts/default";
import ActionCards from "@/test/actions-cards/App";
import BasicBanner from "@/test/basic-banner/App";
import BasicNavbar from "@/test/basic-navbar/App";
import CardFieldset from "@/test/card-fieldset/App";
import DismissableCard from "@/test/dismissable-card/App";
import EventAnnouncement from "@/test/event-announcement/App";
import HeroSectionBasic from "@/test/hero-section-basic/App";
import PromptContainerEmpty from "@/test/prompt-container-empty/App";
import ReviewCommentCard from "@/test/review-comment-card/App";
import SimpleLogin from "@/test/simple-login/App";
import SimpleLoginWithoutBackground from "@/test/simple-login-without-background/App";
import SimpleStepper from "@/test/simple-stepper/App";
import { AP } from "@/test/m";
export default function Test() {
  return (
    <DefaultLayout>
      <p>Hello</p>
      <Routes>
        <Route path="ac" element={<ActionCards />} />
        <Route path="bb" element={<BasicBanner />} />
        <Route path="bn" element={<BasicNavbar />} />
        <Route path="cf" element={<CardFieldset />} />
        <Route path="dc" element={<DismissableCard />} />
        <Route path="ea" element={<EventAnnouncement />} />
        <Route path="hsb" element={<HeroSectionBasic />} />
        <Route path="pce" element={<PromptContainerEmpty />} />
        <Route path="rcc" element={<ReviewCommentCard />} />
        <Route path="sl" element={<SimpleLogin />} />
        <Route path="slwb" element={<SimpleLoginWithoutBackground />} />
        <Route path="ss" element={<SimpleStepper />} />

        <Route path="m-ap" element={<AP />} />
      </Routes>
    </DefaultLayout>
  );
}
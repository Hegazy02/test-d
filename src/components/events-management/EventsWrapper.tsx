// src/components/events-management/EventsWrapper.tsx
"use client";
import { useTranslation } from "react-i18next";
import EventsContent from "./EventsContent";

const EventsWrapper = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language;

  return <EventsContent language={lang} />;
};

export default EventsWrapper;

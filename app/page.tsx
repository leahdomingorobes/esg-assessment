"use client";

import React, { useState } from "react";
import { AlertCircle, CheckCircle2, TrendingUp, Zap, ArrowRight } from "lucide-react";

type Step = "form" | "loading" | "result";

interface FormData {
  company: string;
  industry: string;
  employees: string;
  practices: string[];
  compliance: string;
  email: string;
}

const industries = ["Manufacturing", "Technology", "Agriculture", "Retail/E-commerce", "Services/Consulting", "Energy/Utilities", "Real Estate", "Finance", "Other"];
const esgPractices = ["Carbon tracking/reduction", "Waste management", "Energy efficiency", "Water conservation", "Employee diversity programs", "Health & safety protocols", "Ethics/compliance policy", "Community engagement", "Supply chain transparency", "Board accountability"];

export default function ESGAssessment() {
  const [step, setStep] = useState<Step>("form");
  const [formData, setFormData] = useState<FormData>({
    company: "",
    industry: "",
    employees: "",
    practices: [],
    compliance: "",
    email: "",
  });
  const [assessment, setAssessment] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const togglePractice = (practice: string) => {
    setFormData((prev) => ({
      ...prev,
      practices: prev.practices.includes(practice) ? prev.practices.filter((p) => p !== practice) : [...prev.practices, practice],
    }));
  };

  const generateAssessment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.company || !formData.industry || !formData.email) {
      setError("Please fill in all required fields");
      return;
    }

    setLoading(true);
    setError("");
    setStep("loading");

    try {
      const response = await fetch("/api/generate-assessment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          company: formData.company,
          industry: formData.industry,
          employees: formData.employees,
          practices: formData.practices,
          compliance: formData.compliance,
        }),
      });

      const data = await response.json();
      if (!data.success) throw new Error(data.error);

      setAssessment({
        result:
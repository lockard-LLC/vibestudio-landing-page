"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import CTA from "./cta";

const testimonials = [
  {
    text: "VibeStudio has revolutionized my development workflow. The AI-powered mood adaptation understands my coding context better than any tool I've used. Working across multiple languages—from PHP at Meta to Swift for my startup—VibeStudio adapts to my productivity patterns seamlessly. The intelligent routing system has replaced multiple AI subscriptions, saving both time and money while delivering superior results.",
    author: "Connor Clancy",
    role: "Founder of Taste, prev 5 years @ Meta",
  },
  {
    text: "VibeStudio's contextual intelligence has transformed how I approach new technologies. The mood-adaptive interface learns from my coding patterns and provides precisely the assistance I need when I need it. The codebase understanding capabilities make complex projects feel manageable. I'm advocating for enterprise adoption because this level of AI integration is the future of professional development.",
    author: "Jackson Z",
    role: "Big Tech Software Engineer, Prev. Tesla AI",
  },
  {
    text: "VibeStudio feels like having an experienced technical lead available around the clock. The AI understands complex architectural decisions and provides intelligent suggestions for everything from cloud storage implementations to system design. The contextual awareness and professional community support have accelerated my delivery timeline while maintaining high code quality standards.",
    author: "Ricardo Freitas",
    role: "Computer Science Student & Freelancer",
  },
  {
    text: "VibeStudio has been instrumental in my academic projects. From developing healthcare applications to learning agile methodologies, the AI adapts to different project contexts seamlessly. In a single weekend, I built comprehensive user interfaces with advanced features—all while learning new technologies. The mood-adaptive assistance made complex concepts accessible and accelerated my learning curve dramatically.",
    author: "Josh Koelker",
    role: "Information Systems Masters Student",
  },
];

export default function Showcase() {
  const [currentPage, setCurrentPage] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [totalPages, setTotalPages] = useState(3);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  useEffect(() => {
    const checkMobile = () => {
      const isMobileView = window.innerWidth < 1024;
      setIsMobile(isMobileView);
      const newTotalPages = isMobileView
        ? testimonials.length
        : Math.ceil(testimonials.length / 2);
      setTotalPages(newTotalPages);

      setCurrentPage((prev) => Math.min(prev, newTotalPages - 1));
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const navigate = (direction: "next" | "previous") => {
    setCurrentPage((prevPage) =>
      direction === "next"
        ? Math.min(prevPage + 1, totalPages - 1)
        : Math.max(prevPage - 1, 0),
    );
  };

  return (
    <>
      {/* Testimonials */}
      <div className="flex items-center justify-center px-3 pb-[30px] lg:px-6 lg:pb-14">
        <div className="z-10 max-w-3xl lg:max-w-[1049px]">
          <div className="flex flex-col items-center justify-center gap-4 pb-5 lg:pb-8">
            <span className="text-4xl font-semibold lg:text-[44px]">
              Developers Choose VibeStudio.
            </span>
            <span className="hidden text-xl text-[#666666] lg:block">
              Professional AI-powered development for every skill level.
            </span>
          </div>

          <div
            className="relative overflow-hidden pb-5 lg:pb-4"
            onTouchStart={(e) => setTouchStart(e.targetTouches[0].clientX)}
            onTouchMove={(e) => setTouchEnd(e.targetTouches[0].clientX)}
            onTouchEnd={() => {
              if (touchStart - touchEnd > 50) {
                navigate("next");
              }
              if (touchEnd - touchStart > 50) {
                navigate("previous");
              }
            }}
          >
            <AnimatePresence initial={false} mode="wait">
              <motion.div
                key={currentPage}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="grid grid-cols-1 gap-5 lg:grid-cols-2"
              >
                {testimonials
                  .slice(
                    currentPage * (isMobile ? 1 : 2),
                    (currentPage + 1) * (isMobile ? 1 : 2),
                  )
                  .map((testimonial, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="flex h-[400px] flex-col justify-between rounded-xl p-4 transition-colors lg:h-full lg:bg-[#F4F4F4] lg:p-7"
                    >
                      <p className="mb-2 text-base text-[#666666] lg:mb-4">
                        {testimonial.text}
                      </p>
                      <div className="mt-auto">
                        <p className="text-base font-semibold">
                          {testimonial.author}
                        </p>
                        <p className="text-base text-[#666666]">
                          {testimonial.role}
                        </p>
                      </div>
                    </motion.div>
                  ))}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-center gap-2">
            <ChevronRight
              className="h-4 w-4 rotate-180 cursor-pointer stroke-[2.5] text-[#808080]"
              onClick={() => navigate("previous")}
            />

            <div className="flex gap-2">
              {[...Array(totalPages)].map((_, i) => (
                <div
                  key={i}
                  className={`h-2 w-2 rounded-full ${
                    i === currentPage ? "bg-[#808080]" : "bg-[#e6e6e6]"
                  }`}
                />
              ))}
            </div>

            <ChevronRight
              className="h-4 w-4 cursor-pointer stroke-[2.5] text-[#808080]"
              onClick={() => navigate("next")}
            />
          </div>
        </div>
      </div>

      <CTA />
    </>
  );
}

"use client";

import Giscus from "@giscus/react";
import { useTheme } from "@/components/ThemeProvider";

export default function GiscusComments() {
  const { theme } = useTheme();

  return (
    <Giscus
      repo="kamoras/PersonalSite"
      repoId="R_kgDOGzNNXA"
      category="General"
      categoryId="DIC_kwDOGzNNXM4C7w6L"
      mapping="pathname"
      strict="0"
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="top"
      theme={theme === "light" ? "light" : "dark_dimmed"}
      lang="en"
      loading="lazy"
    />
  );
}

import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import { createRoot } from "react-dom/client";
import Router from "@/router";
import { CustomThemeProvider } from "./context/themeContext";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient} >
    <CustomThemeProvider >
      <Router/>
    </CustomThemeProvider>
  </QueryClientProvider>
);

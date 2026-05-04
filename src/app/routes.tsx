import { createBrowserRouter } from "react-router";
import { RootLayout } from "./components/RootLayout";
import { LandingPage } from "./pages/LandingPage";
import { DashboardPage } from "./pages/DashboardPage";
import { WidgetDemoPage } from "./pages/WidgetDemoPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: LandingPage },
      { path: "dashboard", Component: DashboardPage },
      { path: "widget", Component: WidgetDemoPage },
    ],
  },
],{
  basename: "/solanaeasy"
});

export default {
  items: [
    {
      name: "Dashboard",
      url: "/dashboard",
      badge: {
        variant: "info",
        text: "NEW"
      }
    },
    {
      title: true,
      name: "Settings",
      wrapper: {
        // optional wrapper object
        element: "span", // required valid HTML5 element tag
        attributes: {} // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
      },
      class: "" // optional class names space delimited list for title item ex: "text-center"
    }
  ]
};

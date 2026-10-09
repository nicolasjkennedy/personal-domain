export interface StorySection {
  id: string;
  label: string;
  title: string;
  paragraphs: string[];
  bullets?: string[];
}

export const serviceSurferStory = {
  title: "ServiceSurfer",
  subtitle: "From a local services directory to an AI phone line that connects homeowners with the right provider",
  role: "Co-Founder",
  years: "2025 – 2026",
  sections: [
    {
      id: "origin",
      label: "01",
      title: "Where It Started",
      paragraphs: [
        "ServiceSurfer started with two problems I kept running into, one from each side of the counter.",
        "The first was my own. Whenever I needed someone to do a job, the options were scattered across the entire internet: a few on Google Maps, a few on Angi, some on Thumbtack, some buried on Craigslist. There wasn't one place that had all of them, and in this day and age that felt ridiculous.",
        "The second I saw from the inside. In the summer of 2025, I worked for a party rental company, Easy Does It Entertainment, and watched how much a small business spends on advertising that barely converts. Money that should have been going back into the business was going to ads that weren't bringing in customers.",
        "I realized those were the same problem seen from two directions. People couldn't find local businesses, and local businesses were paying too much to be found. I started scheming up a way to fix both, brought my friend Briac on to help bring it to life, and we got to work.",
      ],
    },
    {
      id: "first-version",
      label: "02",
      title: "The First Version",
      paragraphs: [
        "Our first version was a web platform. You could describe your problem or pick the type of service you needed, and ServiceSurfer would show you every provider in your area. Behind the scenes, we pulled listings from Google Maps, Angi, Thumbtack, Craigslist, and general search results, then combined them into one list so you had as many options as possible in one place.",
        "For businesses, I designed something simpler and cheaper than traditional advertising: a small monthly fee to be listed at the top of results when someone nearby searched for exactly the service they offer. No wasted impressions, just placement in front of people who were already looking.",
        "I led the product design and built most of the core logic behind the matching, with Briac supporting the build-out. At the same time, I was reaching out to providers, growing the network, and figuring out how to get customers in the door. On paper, we had built exactly what we set out to build: one place with all of the options.",
      ],
    },
    {
      id: "turning-point",
      label: "03",
      title: "The Turning Point",
      paragraphs: [
        "After a stretch away from working on the company directly, we sat down with our business mentors from the URI RISE-UP program. They told us something we didn't want to hear: just because we had a platform with every provider on it didn't mean people would go out of their way to use it.",
        "It stung, but they were right, and it pushed us further than we could have imagined. Instead of asking people to come find us, we went to where they already were: the phone. We then designed a phone line where an AI agent talks with the caller, lets them explain their home issue, asks clarifying questions, suggests potential quick fixes (when applicable), and then routes the call straight to a local provider all in one seamless phone call.",
        "The web platform stayed, but the phone line became the heart and main priority of ServiceSurfer.",
      ],
    },
    {
      id: "official",
      label: "04",
      title: "Making It Official",
      paragraphs: [
        "With a clearer direction, we formed ServiceSurfer LLC. After waiting the entire month of February, we finally got our EIN from the IRS in early 2026. That was the moment it stopped being a side project and became a real business.",
      ],
    },
    {
      id: "going-public",
      label: "05",
      title: "Taking It Public",
      paragraphs: [
        "Once we had something real, I wanted to put it in front of as many people as possible. We pitched ServiceSurfer at the RISE-UP pitch night, and we brought it to a business convention at Bryant University, where I got to tell dozens of people about what we were building.",
        "The response was great, and one idea kept coming up: a FaceTime-style video feature, so our AI model could see the problem and help troubleshoot it in real time. It's the kind of direction you only find by talking to people, and it became one of the most exciting possibilities for where ServiceSurfer could go next.",
      ],
    },
    {
      id: "my-role",
      label: "06",
      title: "My Role",
      paragraphs: [
        "ServiceSurfer was my idea, and as co-founder I worked on both sides of it: designing and engineering the product, and making sure it had providers to route to and customers to serve.",
      ],
      bullets: [
        "Came up with the idea for ServiceSurfer and led product design from the first version through the pivot",
        "Engineered most of the core logic behind the matching platform and the AI phone line",
        "Designed the business model: affordable, high-intent featured listings as an alternative to traditional small business advertising",
        "Led provider outreach and partnerships, growing the supply side that both the web platform and the phone line depended on",
        "Drove go-to-market strategy: consumer acquisition, provider onboarding, and market expansion",
        "Pitched at RISE-UP pitch night and presented at a business convention at Bryant University to gather public feedback",
        "Handled company formation, positioning, and business development, from the LLC and EIN to how we pitched ServiceSurfer to providers (I've always said engineers have a business mind it just needs to be discovered)",
      ],
    },
    {
      id: "lessons",
      label: "07",
      title: "What I Learned",
      paragraphs: [
        "The biggest lesson came from that RISE-UP meeting: building something isn't the same as people using it. A product has to meet people where they already are, and sometimes that means letting go of the version you first pictured. Talking to dozens of people at Bryant drove the point home: the best ideas for a product often come from the people you show it to.",
        "Running a two-sided marketplace taught me the rest. You can't grow demand without supply, and you can't keep providers around without customers, so every decision has to serve both sides at once. Add in the paperwork, the waiting, and the pivots, and I learned what it actually takes to turn an idea into a company.",
      ],
    },
    {
      id: "where-it-stands",
      label: "08",
      title: "Where ServiceSurfer Stands",
      paragraphs: [
        "As ServiceSurfer heads into its next chapter, I've decided to make the difficult decision to step away from my role with the company, and consequently pass the torch over to Briac.",
        "I'm proud of what we built together. ServiceSurfer started as two frustrations, one as a customer and one from inside a small business, and grew into an AI phone line that connects people with the help they need. Along the way, it taught me how to build something from nothing. I'm grateful to Briac for taking that leap with me, and I'm excited to see where the company goes from here.",
        "For me, this means putting my full focus back on networking, my studies at URI, and whatever I build next.",
      ],
    },
  ] as StorySection[],
};

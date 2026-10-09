export interface SpecRow {
  label: string;
  value: string;
}

export interface TestStep {
  name: string;
  detail: string;
}

export interface Limitation {
  title: string;
  detail: string;
}

export interface RoadmapItem {
  title: string;
  detail: string;
  status: "active" | "next" | "planned";
}

export const netTest = {
  title: "NetTest",
  subtitle: "An open-source, build-it-yourself network tester inspired by the NetAlly LinkSprinter",
  status: "In Development",
  github: "https://github.com/nicolasjkennedy/NetTest",

  overview: [
    "NetTest is my first hardware project as a network engineer: a pocket-sized device you plug into any Ethernet port to find out, in seconds, whether that drop actually works and how it's configured.",
    "Tools like the NetAlly LinkSprinter do this well, but they cost hundreds of dollars, which puts them out of reach for students, hobbyists, and small IT shops. NetTest aims to do everything the LinkSprinter can do, and a little more, for under $100 in parts, with the hardware, firmware, and documentation fully open source so anyone can build one themselves.",
  ],

  specs: [
    { label: "Microcontroller", value: "ESP32 with onboard PoE Ethernet" },
    { label: "Power", value: "PoE, with a rechargeable or AA battery option for unpowered ports" },
    { label: "Display", value: "Small onboard screen for live results" },
    { label: "Enclosure", value: "Custom 3D-printed case" },
    { label: "Storage", value: "Last few test results saved on-device, oldest rotated out" },
    { label: "Target cost", value: "Under $100 in parts" },
    { label: "License", value: "Open source: hardware, firmware, and docs" },
  ] as SpecRow[],

  // The order the device runs its checks; each step depends on the one before it
  tests: [
    { name: "Power", detail: "Detect whether the device is being powered over PoE" },
    { name: "Link", detail: "Confirm a physical link is up and report the negotiated speed and duplex" },
    { name: "Switch & Port", detail: "Listen for LLDP/CDP to identify the upstream switch, port number, and VLAN" },
    { name: "DHCP", detail: "Request an address and report the IP, subnet mask, gateway, and DNS servers handed out" },
    { name: "Gateway", detail: "Ping the default gateway to confirm local reachability" },
    { name: "DNS", detail: "Resolve a known hostname against the assigned DNS servers" },
    { name: "Internet", detail: "Reach an outside host to confirm the drop has a working path to the internet" },
  ] as TestStep[],

  screenInfo: [
    "Pass / fail for each test",
    "Assigned IP address and subnet",
    "Default gateway and DNS servers",
    "Switch name and port number",
    "VLAN",
    "Link speed and duplex",
  ],

  howItWorks: [
    "When NetTest is plugged into a PoE port, the port powers it on and it starts a full test run automatically, with no buttons needed. On a port without PoE, you turn it on with the battery first, then plug it in.",
    "Each run steps through the checks in order, from the physical link up to the internet, so the first failure tells you exactly where the problem is. Results show on the screen as they come in, and the last few runs are saved on the device so you can walk a building testing drops and review them afterward.",
  ],

  limitations: [
    {
      title: "Link speed tops out at 100 Mbps",
      detail: "The ESP32's built-in Ethernet supports 10/100 Mbps only, so NetTest can confirm a link and its duplex but can't negotiate or verify gigabit like the LinkSprinter can. Gigabit support would need a different Ethernet chip, which is a job for the custom PCB.",
    },
    {
      title: "PoE details need extra circuitry",
      detail: "The board can tell when it's running on PoE, but reporting details like PoE class or supplied voltage requires measurement hardware beyond an off-the-shelf board. I'm still deciding whether that's worth adding to the first version.",
    },
  ] as Limitation[],

  roadmap: [
    { title: "Research & parts sourcing", detail: "Finding an ESP32 board with PoE Ethernet built in, plus the right screen and battery setup", status: "active" },
    { title: "First prototype", detail: "Order parts and get a breadboard build running the core tests", status: "next" },
    { title: "Firmware", detail: "Build out the full test sequence, the on-screen results, and on-device history", status: "planned" },
    { title: "3D-printed case", detail: "Design an enclosure that fits the board, screen, and battery", status: "planned" },
    { title: "Build guide", detail: "Write documentation good enough for anyone to source parts and build their own", status: "planned" },
    { title: "Custom PCB", detail: "Eventually move everything onto a single custom board", status: "planned" },
  ] as RoadmapItem[],

  why: [
    "I work on campus networks every day, and a tester like this is one of the most useful tools you can have. Plug it in and you know right away whether a drop is live, which switch port it lands on, and what VLAN it's on.",
    "What bothers me is how much these tools cost. NetTest is my answer to that: powerful network testing at the lowest possible cost, by giving people everything they need to build it themselves.",
  ],
};

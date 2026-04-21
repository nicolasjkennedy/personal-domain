# CCNA Study App — Content Map

_Generated: 2026-04-19_

This table shows all domains and topics with their flashcard and question counts.

---

## Summary

| Content Type | Count |
|---|---|
| Domains | 6 |
| Topics | 30 (5 per domain) |
| Flashcards | 96 total |
| Questions | 82 total |
| CLI Commands | 72 total |

---

## Domain 1 — Network Fundamentals (20%)

Source weeks: 1, 2

| Topic ID | Topic Name | Flashcards | Questions | Commands |
|---|---|---|---|---|
| `osi-tcpip-models` | OSI & TCP/IP Models | 6 | 4 | — |
| `ipv4-addressing` | IPv4 Addressing Structure | 2 | 3 | — |
| `subnetting` | Subnetting & CIDR | 4 | 4 | — |
| `network-devices` | Network Device Roles | 2 | 2 | — |
| `ethernet-cabling` | Ethernet Cabling Standards | 2 | 1 | — |
| **Domain total** | | **16** | **14** | **11** |

---

## Domain 2 — Network Access (20%)

Source weeks: 3, 4

| Topic ID | Topic Name | Flashcards | Questions | Commands |
|---|---|---|---|---|
| `vlans` | VLAN Concepts & Configuration | 3 | 3 | — |
| `trunk-ports` | Trunk Ports & 802.1Q Tagging | 3 | 3 | — |
| `spanning-tree` | Spanning Tree Protocol (STP/RSTP) | 4 | 4 | — |
| `wireless-standards` | Wireless LAN Standards | 3 | 3 | — |
| `wireless-security` | Wireless Security | 3 | 2 | — |
| **Domain total** | | **16** | **15** | **12** |

---

## Domain 3 — IP Connectivity (25%)

Source weeks: 5, 6, 7

| Topic ID | Topic Name | Flashcards | Questions | Commands |
|---|---|---|---|---|
| `static-routing` | Static Routes & Default Routes | 3 | 3 | — |
| `ospf` | OSPF Concepts & Configuration | 4 | 4 | — |
| `eigrp` | EIGRP & Administrative Distance | 3 | 2 | — |
| `nat-pat` | NAT & PAT | 2 | 3 | — |
| `bgp-summarization` | BGP Basics & Route Summarization | 3 | 1 | — |
| **Domain total** | | **15** | **13** | **11** |

---

## Domain 4 — IP Services (10%)

Source weeks: 8

| Topic ID | Topic Name | Flashcards | Questions | Commands |
|---|---|---|---|---|
| `dhcp` | DHCP & the DORA Process | 4 | 4 | — |
| `dns` | DNS Resolution | 2 | 3 | — |
| `ntp-snmp-syslog` | NTP, SNMP & Syslog | 4 | 3 | — |
| `ipv6-basics` | IPv6 Addressing | 4 | 3 | — |
| `dhcp-relay` | DHCP Relay (ip helper-address) | 2 | 2 | — |
| **Domain total** | | **16** | **15** | **11** |

---

## Domain 5 — Security Fundamentals (15%)

Source weeks: 9, 10

| Topic ID | Topic Name | Flashcards | Questions | Commands |
|---|---|---|---|---|
| `acls` | Access Control Lists (Standard & Extended) | 4 | 4 | — |
| `ssh-device-security` | SSH & Device Password Security | 3 | 3 | — |
| `port-security` | Port Security & Violation Modes | 3 | 3 | — |
| `dhcp-snooping-dai` | DHCP Snooping & Dynamic ARP Inspection | 3 | 2 | — |
| `vtp` | VTP Modes & Security | 2 | 1 | — |
| **Domain total** | | **15** | **13** | **11** |

---

## Domain 6 — Automation & Programmability (10%)

Source weeks: 11, 12

| Topic ID | Topic Name | Flashcards | Questions | Commands |
|---|---|---|---|---|
| `rest-apis` | REST APIs & HTTP Verbs | 3 | 3 | — |
| `data-formats` | JSON, XML & YAML | 3 | 2 | — |
| `cisco-apis` | Cisco APIs (Meraki, DNA Center) | 3 | 2 | — |
| `ansible-automation` | Ansible & Configuration Management | 3 | 3 | — |
| `sdn` | Software-Defined Networking & IaC | 4 | 3 | — |
| **Domain total** | | **16** | **13** | **12** |

---

## CLI Commands by Domain

| Domain | Command IDs | Count |
|---|---|---|
| Network Fundamentals | cmd-nf-001 through cmd-nf-011 | 11 |
| Network Access | cmd-na-001 through cmd-na-012 | 12 |
| IP Connectivity | cmd-ic-001 through cmd-ic-011 | 11 |
| IP Services | cmd-is-001 through cmd-is-011 | 11 |
| Security Fundamentals | cmd-sf-001 through cmd-sf-011 | 11 |
| Automation | cmd-ap-001 through cmd-ap-012 | 12 |
| **Total** | | **68** |

---

## File Inventory

| File | Purpose | Status |
|---|---|---|
| `src/types/ccna.ts` | All TypeScript interfaces | Created |
| `src/content/ccna-domains.ts` | `ccnaDomains: Domain[]` + `ccnaTopics: Topic[]` | Created |
| `src/content/ccna-flashcards.ts` | `ccnaFlashcards: Flashcard[]` | Created |
| `src/content/ccna-questions.ts` | `ccnaQuestions: Question[]` | Created |
| `src/content/ccna-commands.ts` | `ccnaCommands: CLICommand[]` | Created |
| `docs/CONTENT_MAP.md` | This file | Created |

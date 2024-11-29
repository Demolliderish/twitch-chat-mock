"use client";

import { ChevronDown } from "lucide-react";
import { Icon } from "./icons";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { ScrollArea } from "./ui/scroll-area";

const GIFTS = {
  gold: "https://assets.twitch.tv/assets/GiftBadge-Gold_72-6e5e65687a6ca6959e08.png",
  silver:
    "https://assets.twitch.tv/assets/GiftBadge-Silver_36-bb7c268e0452a2cdcc8d.png",
  bronze:
    "https://assets.twitch.tv/assets/GiftBadge-Bronze_36-fd0ee2ef5196b3414a2f.png",
};

export interface ChatMessage {
  id: string;
  username: string;
  message: string;
  color?: string;
  badges?: Array<keyof typeof BADGES>;
}

export const BADGES = {
  crown:
    "https://static-cdn.jtvnw.net/badges/v1/a1dd5073-19c3-4911-8cb4-c464a7bc1510/1",
  camera:
    "https://static-cdn.jtvnw.net/badges/v1/bd444ec6-8f34-4bf9-91f4-af1e3428d80f/1",
  diamond:
    "https://static-cdn.jtvnw.net/badges/v1/b817aba4-fad8-49e2-b88a-7cc744dfa6ec/3",
  verified:
    "https://static-cdn.jtvnw.net/badges/v1/d12a2e27-16f6-41d0-ab77-b780518f00a3/3",
  mod: "https://static-cdn.jtvnw.net/badges/v1/3267646d-33f0-4b17-b3df-f923a41db1d0/1",
  broadcaster:
    "https://static-cdn.jtvnw.net/badges/v1/5527c58c-fb7d-422d-b71b-f309dcb85cc1/1",
  shield:
    "https://static-cdn.jtvnw.net/badges/v1/9ef7e029-4cdf-4d4d-a0d5-e2b3fb2583fe/1",
  staff:
    "https://static-cdn.jtvnw.net/badges/v1/d97c37bd-a6f5-4c38-8f57-4e4bef88af34/1",
};

export const PRESET_CHAT_COLORS = {
  Red: "#DF121F",
  Blue: "#151AF9",
  Green: "#017F23",
  Firebrick: "#9D2F3C",
  Coral: "#DF7E65",
  Goldenrod: "#BF9F3D",
  BlueViolet: "#7D39E0",
  Chocolate: "#B86B3A",
  CadetBlue: "#5699A8",
  YellowGreen: "#87C14E",
  SeaGreen: "#2C886B",
  DodgerBlue: "#248EF9",
  SpringGreen: "#00EC8E",
  OrangeRed: "#DF4C21",
  HotPink: "#E06CB9",
};
export default function Component({ messages }: { messages: ChatMessage[] }) {
  return (
    <div className="absolute bottom-0 right-0 w-full max-w-[340px] bg-[#17171A] text-[#EFEFF1] h-[calc(100vh-50px)] flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex flex-col border-b border-[#2F2F35]">
        {/* Top header */}
        <div className="flex items-center gap-2 p-2 border-b border-[#2F2F35]">
          <button className="p-1 hover:bg-[#2F2F35] rounded">
            <Icon icon="CSTM_exit" className="h-5 w-5" />
          </button>
          <h1 className="flex-1 text-center font-semibold text-sm">
            STREAM CHAT
          </h1>
          <button className="p-1 hover:bg-[#2F2F35] rounded">
            <Icon icon="CSTM_users" className="h-5 w-5" />
          </button>
        </div>

        {/* Sub header with gift info */}
        <div className="w-full px-2 py-2 overflow-visible whitespace-nowrap space-x-3">
          <GiftLeader
            src={GIFTS.gold}
            username="kingfish12"
            className="inline-flex"
          />
          <GiftLeader
            src={GIFTS.silver}
            username="shahzain221"
            className="inline-flex"
          />
          <GiftLeader
            src={GIFTS.bronze}
            username="guppies_"
            className="inline-flex"
          />
        </div>
      </div>

      {/* Pinned Message */}
      <div className="p-2">
        <div className=" rounded-lg bg-[#1F1F23] p-2 border border-[#2F2F35]">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-[#ADADB8]">📌 Pinned by ✅ BlubStudio</span>
            <button className="ml-auto hover:bg-[#2F2F35] p-1 rounded">
              <ChevronDown className="h-4 w-4" />
            </button>
          </div>
          <div className="font-medium">Check us out at @ blob.productions</div>
        </div>
      </div>

      {/* Chat Messages */}
      <ScrollArea className="flex-1 px-2 py-1 space-y-1">
        {messages.map((msg) => (
          <Message key={msg.id} msg={msg} />
        ))}
      </ScrollArea>

      {/* Chat Input */}
      <div className="p-2">
        <div className="relative">
          <div className="flex items-center border border-[#2F2F35] rounded py-1">
            <TwitchButton className="flex items-center ml-1 opacity-50 hover:opacity-100 cursor-pointer">
              <Icon icon="CSTM_star" className="w-5 h-5 text-white" />
            </TwitchButton>
            <input
              type="text"
              placeholder="Send a message"
              className="flex-1 bg-transparent pl-1 pr-3 py-1 text-sm text-[#EFEFF1] placeholder-[#ADADB8] focus:outline-none"
            />
            <div className="flex items-center gap-1 pr-2">
              <TwitchButton>
                <Icon
                  icon="CSTM_cheer"
                  className="w-5 h-5 text-[#EFEFF1] opacity-50"
                />
              </TwitchButton>
              <TwitchButton>
                <Icon
                  icon="CSTM_face"
                  className="w-5 h-5 text-[#EFEFF1] opacity-50"
                />
              </TwitchButton>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 ">
              <Icon icon="CSTM_bits" className="w-5 h-5 text-[#BF94FD]" />
              <span className="text-sm text-[#A6A18A]">0</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="w-8 h-8 flex items-center justify-center hover:bg-[#2F2F35] rounded">
              <Icon icon="CSTM_settings" className="w-5 h-5 text-[#EFEFF1]" />
            </button>
            <button className="px-3 text-sm py-1 bg-[#9147FF] hover:bg-[#772CE8] rounded text-white font-medium">
              Chat
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const Message = ({ msg }: { msg: ChatMessage }) => {
  return (
    <div className="text-sm leading-5 hover:bg-[#1F1F23] px-1 py-[2px] rounded">
      {/* <span className="text-[#898989]">{msg.timestamp}</span>{" "} */}
      {msg.badges?.map((badge) => (
        <img
          key={badge}
          src={BADGES[badge]}
          alt={badge}
          className="w-4 h-4 inline-block mr-1"
        />
      ))}
      <span className="font-semibold" style={{ color: msg.color }}>
        {msg.username}
      </span>
      <span className="text-[#EFEFF1] font-base">: {msg.message}</span>
    </div>
  );
};

const GiftLeader = ({
  className,
  src,
  username,
}: {
  className?: string;
  src: string;
  username: string;
}) => {
  return (
    <div className={cn("flex items-center gap-1", className)}>
      <Image
        src={src}
        alt="gift badge"
        width={20}
        height={20}
        className="w-5 h-5"
      />
      <span className="text-sm font-semibold">{username}</span>
    </div>
  );
};

const TwitchButton = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <button className={cn("p-1 hover:bg-[#2F2F35] rounded", className)}>
      {children}
    </button>
  );
};

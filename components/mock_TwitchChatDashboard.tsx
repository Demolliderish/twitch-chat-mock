"use client";

import React, { useState } from "react";
import { HexColorPicker } from "react-colorful";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Component from "./mock_TwitchChat";
import { BADGES, PRESET_CHAT_COLORS } from "./mock_TwitchChat";
import type { ChatMessage } from "./mock_TwitchChat";

export default function Dashboard() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState<ChatMessage>({
    id: "",
    username: "",
    message: "",
    color: PRESET_CHAT_COLORS.Red,
    badges: [],
  });
  const [customColor, setCustomColor] = useState(PRESET_CHAT_COLORS.Red);
  const [showColorPicker, setShowColorPicker] = useState(false);

  const handleAddMessage = () => {
    if (newMessage.username && newMessage.message) {
      setMessages([...messages, { ...newMessage, id: Date.now().toString() }]);
      setNewMessage({
        id: "",
        username: "",
        message: "",
        color: PRESET_CHAT_COLORS.Red,
        badges: [],
      });
    }
  };

  const handleRemoveMessage = (id: string) => {
    setMessages(messages.filter((msg) => msg.id !== id));
  };

  const handleBadgeToggle = (badge: keyof typeof BADGES) => {
    setNewMessage((prev) => ({
      ...prev,
      badges: prev.badges?.includes(badge)
        ? prev.badges.filter((b) => b !== badge)
        : [...(prev.badges || []), badge],
    }));
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/2 p-4 bg-gray-100 overflow-auto">
        <h2 className="text-2xl font-bold mb-4">Twitch Chat Dashboard</h2>
        <div className="space-y-4">
          <div>
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              value={newMessage.username}
              onChange={(e) =>
                setNewMessage({ ...newMessage, username: e.target.value })
              }
            />
          </div>
          <div>
            <Label htmlFor="message">Message</Label>
            <Input
              id="message"
              value={newMessage.message}
              onChange={(e) =>
                setNewMessage({ ...newMessage, message: e.target.value })
              }
            />
          </div>
          <div>
            <Label>Color</Label>
            <Select
              value={newMessage.color}
              onValueChange={(value) => {
                if (value === "custom") {
                  setShowColorPicker(true);
                } else {
                  setNewMessage({ ...newMessage, color: value });
                  setShowColorPicker(false);
                }
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a color" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(PRESET_CHAT_COLORS).map(([name, color]) => (
                  <SelectItem key={color} value={color}>
                    <div className="flex items-center">
                      <div
                        className="w-4 h-4 rounded-full mr-2"
                        style={{ backgroundColor: color }}
                      />
                      {name}
                    </div>
                  </SelectItem>
                ))}
                <SelectItem value="custom">Custom Color</SelectItem>
              </SelectContent>
            </Select>
            {showColorPicker && (
              <div className="mt-2">
                <HexColorPicker
                  color={customColor}
                  onChange={(color) => {
                    setCustomColor(color);
                    setNewMessage({ ...newMessage, color });
                  }}
                />
              </div>
            )}
          </div>
          <div>
            <Label>Badges</Label>
            <div className="grid grid-cols-3 gap-2">
              {Object.entries(BADGES).map(([badge, url]) => (
                <div key={badge} className="flex items-center space-x-2">
                  <Checkbox
                    id={badge}
                    checked={newMessage.badges?.includes(
                      badge as keyof typeof BADGES
                    )}
                    onCheckedChange={() =>
                      handleBadgeToggle(badge as keyof typeof BADGES)
                    }
                  />
                  <Label
                    htmlFor={badge}
                    className="flex items-center space-x-2"
                  >
                    <img src={url} alt={badge} className="w-4 h-4" />
                    <span>{badge}</span>
                  </Label>
                </div>
              ))}
            </div>
          </div>
          <Button onClick={handleAddMessage}>Add Message</Button>
        </div>
        <ScrollArea className="h-[300px] mt-4 border rounded">
          <div className="p-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className="flex justify-between items-center mb-2"
              >
                <span>
                  {msg.badges?.map((badge) => (
                    <img
                      key={badge}
                      src={BADGES[badge]}
                      alt={badge}
                      className="w-4 h-4 inline mr-1"
                    />
                  ))}
                  <span style={{ color: msg.color }}>{msg.username}</span>:{" "}
                  {msg.message}
                </span>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleRemoveMessage(msg.id)}
                >
                  Remove
                </Button>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
      <div className="w-1/2 bg-gray-800">
        <Component messages={messages} />
      </div>
    </div>
  );
}

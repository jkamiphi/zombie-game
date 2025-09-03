import { useState, useEffect } from "react";
import type { GameMessage } from "@/lib/types";

export function useZombieGame() {
  const [messages, setMessages] = useState<GameMessage[]>([]);
  const [input, setInput] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (messages.length === 0) {
      startGame();
    }
  }, []);

  const startGame = async () => {
    setIsLoading(true);

    try {
      const response = await fetch("/api/generate-story", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          isStart: true,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate story");
      }

      const data = await response.json();

      const messageId = crypto.randomUUID();

      const newMessage: GameMessage = {
        id: messageId,
        role: "assistant",
        content: data.narrative,
        imageLoading: true,
      };

      setMessages([newMessage]);
      generateImage(data.imagePrompt, messageId);
    } catch (error) {
      console.error("Error starting game:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const generateImage = async (imagePrompt: string, messageId: string) => {
    try {
      const response = await fetch("/api/generate-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          imagePrompt,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate image");
      }

      const data = await response.json();

      setMessages((prevMessages) =>
        prevMessages.map((msg) => {
          if (msg.id === messageId) {
            return {
              ...msg,
              image: data.image,
              imageLoading: false,
            };
          }
          return msg;
        })
      );
    } catch (error) {
      console.error("Error generating image:", error);

      setMessages((prevMessages) =>
        prevMessages.map((msg) => {
          if (msg.id === messageId) {
            return {
              ...msg,
              imageLoading: false,
            };
          }
          return msg;
        })
      );
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!input.trim() || isLoading) return;

    const messageId = crypto.randomUUID();

    const newMessage: GameMessage = {
      id: messageId,
      role: "user",
      content: input,
    };

    setIsLoading(true);
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setInput("");

    try {
      const response = await fetch("/api/generate-story", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          isStart: false,
          conversationHistory: messages,
          userMessage: input,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate story");
      }

      const data = await response.json();

      const assistantMessageId = crypto.randomUUID();

      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: assistantMessageId,
          role: "assistant",
          content: data.narrative,
          imageLoading: true,
        },
      ]);

      generateImage(data.imagePrompt, assistantMessageId);
    } catch (error) {
      console.error("Error generating story:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(event.target.value);
  };

  return {
    messages,
    input,
    isLoading,
    handleInputChange,
    startGame,
    handleSubmit,
  };
}

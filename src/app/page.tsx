"use client";

import { GameInput } from "@/components/blocks/game-input";
import { GameLoader } from "@/components/blocks/game-loader";
import { GameMessage } from "@/components/blocks/game-message";
import { useZombieGame } from "@/hooks/use-zombie-game";

export default function Page() {
  const { messages, input, isLoading, handleInputChange, handleSubmit } =
    useZombieGame();
  return (
    <div className="font-sans min-h-screen p-8 max-w-xl mx-auto">
      <div className="">
        {messages.map((message) => (
          <GameMessage key={message.id} message={message} />
        ))}
      </div>
      {isLoading && <GameLoader />}
      <GameInput
        input={input}
        onInputChange={handleInputChange}
        onSubmit={handleSubmit}
        isLoading={isLoading}
      />
    </div>
  );
}

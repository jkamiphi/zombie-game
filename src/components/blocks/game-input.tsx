import { UI_MESSAGES } from "@/lib/constants";
import {
  PromptInput,
  PromptInputTextarea,
  PromptInputSubmit,
  PromptInputToolbar,
} from "../shared/prompt-input";

interface GameInputProps {
  input: string;
  onInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
}

export function GameInput({
  input,
  onInputChange,
  onSubmit,
  isLoading,
}: GameInputProps) {
  const inputTrimmed = input.trim();
  const inputSubmitIsDisabled = isLoading || inputTrimmed === "";

  return (
    <PromptInput
      onSubmit={onSubmit}
      className="mt-4 w-full max-w-2xl mx-auto relative"
    >
      <PromptInputTextarea
        placeholder={UI_MESSAGES.PLACEHOLDERS.INPUT}
        value={input}
        onChange={onInputChange}
        disabled={isLoading}
        className="pr-12"
      />
      <PromptInputToolbar>
        <PromptInputSubmit
          disabled={inputSubmitIsDisabled}
          className="absolute bottom-1 right-1"
        />
      </PromptInputToolbar>
    </PromptInput>
  );
}

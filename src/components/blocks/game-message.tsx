import { Message, MessageContent } from "@/components/shared/message";
import { type GameMessage as GameMessageType } from "@/lib/types";
import { Image } from "@/components/shared/image";
import { Loader } from "../shared/loader";
import { UI_MESSAGES } from "@/lib/constants";
import { Response } from "../shared/response";

export function GameMessage({ message }: { message: GameMessageType }) {
  const { content, image, role, imageLoading } = message;
  return (
    <Message from={role}>
      <MessageContent>
        {role !== "user" && (
          <picture className="flex justify-center items-center max-w-2xl aspect-video overflow-hidden rounded-md">
            {imageLoading && (
              <div className="w-full flex items-center justify-center h-full bg-black/30">
                <Loader />
                <span>{UI_MESSAGES.LOADING.IMAGE}</span>
              </div>
            )}

            {image && (
              <Image
                base64={image.base64Data}
                mediaType={image.mediaType}
                alt="zombie apocalypse pixel art image"
                className="mx-auto max-w-md h-auto object-cover object-center"
                uint8Array={new Uint8Array()}
              />
            )}
          </picture>
        )}
        <Response>{content}</Response>
      </MessageContent>
    </Message>
  );
}

import { Message, MessageContent } from "@/components/shared/message";
import { Loader } from "../shared/loader";

export function GameLoader() {
  return (
    <Message from="assistant">
      <MessageContent>
        <div className="flex items-center gap-2">
          <Loader />
          Cargando historia...
        </div>
      </MessageContent>
    </Message>
  );
}

import { InfoToast } from "@ui/toast/Info-toast";
import { toast } from "react-toastify";

export default class NotifyService {
  private static _connectionProblemToastId: string | number | null = null;

  static message(text: string, description: string) {
    if (NotifyService._connectionProblemToastId) {
      toast.update(NotifyService._connectionProblemToastId, {
        autoClose: 10000,
      });
      return;
    }
    NotifyService._connectionProblemToastId = toast(
      () => <InfoToast message={text} description={description} />,
      {
        type: "warning",
        position: "top-left",
        autoClose: 10000,
        onClose: () => (NotifyService._connectionProblemToastId = null),
      }
    );
  }
}

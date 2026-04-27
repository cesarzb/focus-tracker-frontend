"use client";

import { useState, useEffect, SyntheticEvent } from "react";
import { Loader2 } from "lucide-react";
import api from "@/api/client";
import type { Session } from "@/types/session";
import ModalLayout from "@/components/ui/Modal/ModalLayout";
import FormInput from "@/components/ui/Form/FormInput";

interface SessionFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSessionSaved: (session: Session) => void;
  sessionToEdit?: Session | null;
}

const SessionFormModal = ({
  isOpen,
  onClose,
  onSessionSaved,
  sessionToEdit,
}: SessionFormModalProps) => {
  const [formData, setFormData] = useState({
    name: "",
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen && sessionToEdit) {
      const s = new Date(sessionToEdit.startTime);
      const e = new Date(sessionToEdit.endTime);
      setFormData({
        name: sessionToEdit.name,
        startDate: s.toISOString().split("T")[0],
        startTime: s.toTimeString().substring(0, 5),
        endDate: e.toISOString().split("T")[0],
        endTime: e.toTimeString().substring(0, 5),
      });
    } else if (isOpen) {
      const now = new Date();
      setFormData({
        name: "",
        startDate: now.toISOString().split("T")[0],
        startTime: now.toTimeString().substring(0, 5),
        endDate: now.toISOString().split("T")[0],
        endTime: now.toTimeString().substring(0, 5),
      });
    }
  }, [isOpen, sessionToEdit]);

  const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const payload = {
        name: formData.name,
        startTime: new Date(
          `${formData.startDate}T${formData.startTime}`,
        ).toISOString(),
        endTime: new Date(
          `${formData.endDate}T${formData.endTime}`,
        ).toISOString(),
      };

      const res = sessionToEdit
        ? await api.patch(`/sessions/${sessionToEdit.id}`, payload)
        : await api.post("/sessions", payload);

      onSessionSaved(res.data);
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ModalLayout
      isOpen={isOpen}
      onClose={onClose}
      title={sessionToEdit ? "Edit Session" : "Log Session"}
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <FormInput
          label="Session Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <div className="grid grid-cols-2 gap-4">
          <FormInput
            label="Start Date"
            type="date"
            value={formData.startDate}
            onChange={(e) =>
              setFormData({ ...formData, startDate: e.target.value })
            }
          />
          <FormInput
            label="Start Time"
            type="time"
            value={formData.startTime}
            onChange={(e) =>
              setFormData({ ...formData, startTime: e.target.value })
            }
          />
          <FormInput
            label="End Date"
            type="date"
            value={formData.endDate}
            onChange={(e) =>
              setFormData({ ...formData, endDate: e.target.value })
            }
          />
          <FormInput
            label="End Time"
            type="time"
            value={formData.endTime}
            onChange={(e) =>
              setFormData({ ...formData, endTime: e.target.value })
            }
          />
        </div>
        <div className="mt-8 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl px-4 py-2 text-sm font-medium text-stone-300 hover:bg-stone-800"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="flex w-40 items-center justify-center rounded-xl bg-orange-600 py-2 text-sm font-bold text-white hover:bg-orange-500 active:scale-95 transition-all"
          >
            {isLoading ? (
              <Loader2 className="animate-spin" size={18} />
            ) : sessionToEdit ? (
              "Update Session"
            ) : (
              "Save Session"
            )}
          </button>
        </div>
      </form>
    </ModalLayout>
  );
};

export default SessionFormModal;

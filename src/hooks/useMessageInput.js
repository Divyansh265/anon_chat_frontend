import { useState, useCallback } from 'react';

const MAX_LENGTH = 500;

export function useMessageInput(onSend) {
  const [value, setValue] = useState('');

  const handleChange = useCallback((e) => {
    if (e.target.value.length <= MAX_LENGTH) {
      setValue(e.target.value);
    }
  }, []);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (!value.trim()) return;
      onSend(value.trim());
      setValue('');
    },
    [value, onSend]
  );

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        handleSubmit(e);
      }
    },
    [handleSubmit]
  );

  return { value, handleChange, handleSubmit, handleKeyDown, maxLength: MAX_LENGTH };
}

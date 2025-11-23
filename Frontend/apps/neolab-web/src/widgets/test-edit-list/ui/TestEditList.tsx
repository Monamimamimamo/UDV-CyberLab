import {
  QuestionCreateCard,
  QuestionEditCard,
} from '@/features/test-question-edit';
import type { QuestionDTO } from '@/shared/api/dto';
import { useCallback, useState } from 'react';
import { AddNewButton } from './AddNewButton';

type TestEditListProps = {
  questions: QuestionDTO[];
  testId: string;
};

export const TestEditList = ({ questions, testId }: TestEditListProps) => {
  const [editList, setEditList] = useState<QuestionDTO[]>(questions);

  const handleAddQuestion = useCallback(() => {
    setEditList(prev => [
      ...prev,
      { id: `new_${crypto.randomUUID()}`, testId, points: 1 } as QuestionDTO,
    ]);
  }, [testId]);

  return (
    <div>
      <ul className="flex flex-col gap-3 mb-2">
        {editList.map((question, index) => (
          <li key={question.id}>
            {question.id.startsWith('new') ? (
              <QuestionCreateCard
                setQuestion={setEditList}
                index={index + 1}
                question={question}
              />
            ) : (
              <QuestionEditCard
                setQuestion={setEditList}
                index={index + 1}
                question={question}
              />
            )}
          </li>
        ))}
      </ul>
      <AddNewButton handleAddQuestion={handleAddQuestion} />
    </div>
  );
};

import { create } from 'zustand';
import type { SavedAnswer, SavedAnswerWithKey } from './dto';
import type { QuestionDTO } from '@/shared/api/dto';

type AnswersState = {
  count: number;
  answers: SavedAnswerWithKey[];
  saveAnswers: (answers: SavedAnswer[]) => void;
  setQuestions: (questions: QuestionDTO[], totalQuestions: number) => void;
  saveAnswer: (id: string, answer: SavedAnswer) => void;
  reset: () => void;
  getAnswersBooleanArray: () => boolean[];
};

export const useAnswers = create<AnswersState>((set, get) => ({
  count: 0,
  answers: [],
  setQuestions: (questions, totalQuestions: number) =>
    set({
      answers: questions.map((question) => ({
        id: question.id,
        data: null,
      })),
      count: totalQuestions,
    }),
  saveAnswers: (savedAnswers) =>
    set({
      answers: get().answers.map((question) => ({
        id: question.id,
        data: savedAnswers.find((answer) => answer.questionId === question.id) || null,
      })),
    }),
  saveAnswer: (id: string, answer: SavedAnswer) => {
    set({
      answers: get().answers.map((a) =>
        a.id === id ? { ...a, data: { ...a.data, ...answer } } : a,
      ),
    });
  },
  reset: () => set({ answers: [] }),
  getAnswersBooleanArray: () => get().answers.map((answer) => Boolean(answer.data)),
}));

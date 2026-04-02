import type { Meta, StoryObj } from "@storybook/react";
import { MemoryRouter } from "react-router";
import GameModal from "../components/modals/GameModal";

const meta: Meta<typeof GameModal> = {
  title: "Complex/GameModal",
  component: GameModal,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <div id="modal-root" />
        <Story />
      </MemoryRouter>
    ),
  ],
  argTypes: {
    isOpen: {
      control: "boolean",
      description: "Чи відкрита модалка",
      table: { category: "State" },
    },
    score: {
      control: { type: "number", min: 0, max: 9999, step: 1 },
      description: "Поточний рахунок гравця",
      table: { category: "Data" },
    },
    highScore: {
      control: { type: "number", min: 0, max: 9999, step: 1 },
      description: "Рекордний рахунок всіх часів",
      table: { category: "Data" },
    },
   
    onRestart: {
      description: "Колбек при натисканні Play Again",
      table: { category: "Events" },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof GameModal>;

export const GameOver: Story = {
  args: {
    isOpen: true,
    score: 7,
    highScore: 15,
  },
};

export const NewHighScore: Story = {
  args: {
    isOpen: true,
    score: 20,
    highScore: 20,
  },
};
export const ZeroScore: Story = {
  args: {
    isOpen: true,
    score: 0,
    highScore: 10,
  },
};
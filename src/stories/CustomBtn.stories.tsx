import type { Meta, StoryObj } from "@storybook/react";
import { MemoryRouter } from "react-router";
import CustomBtn from "../components/CustomBtn";

const meta: Meta<typeof CustomBtn> = {
  title: "Basic/CustomBtn",
  component: CustomBtn,
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={["/home"]}>
        <div
          style={{
            padding: "40px",
            display: "flex",
            gap: "12px",
            background: "#4f46e5",
            borderRadius: "12px",
          }}
        >
          <Story />
        </div>
      </MemoryRouter>
    ),
  ],
  argTypes: {
    link: {
      control: "text",
      description: "URL-шлях для навігації",
      table: { category: "Props" },
    },
    name: {
      control: "text",
      description: "Текст що відображається на кнопці",
      table: { category: "Props" },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof CustomBtn>;

/** Активна кнопка — поточна сторінка збігається з /home */
export const Active: Story = {
  args: {
    link: "/home",
    name: "Home",
  },
};

/** Неактивна кнопка — сторінка інша */
export const Inactive: Story = {
  args: {
    link: "/game",
    name: "Game",
  },
};

/** Кнопка з довгою назвою */
export const LongLabel: Story = {
  args: {
    link: "/results",
    name: "My Results History",
  },
};
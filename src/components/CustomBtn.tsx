import { NavLink } from "react-router";
import type { ComponentProps } from "react";

/**
 * Пропси для компонента CustomBtn.
 */
type CustomBtnProps = {
  /** URL-шлях для навігації (передається в NavLink як `to`) */
  link: string;
  /** Текст, що відображається на кнопці */
  name: string;
} & Omit<ComponentProps<typeof NavLink>, "to">;

/**
 * Навігаційна кнопка з підтримкою активного стану.
 *
 * Використовує `NavLink` з `react-router` для відображення
 * поточної активної сторінки. Активна кнопка виділяється
 * білим фоном з темним текстом.
 *
 * @param props - {@link CustomBtnProps}
 * @example
 * ```tsx
 * <CustomBtn link="/home" name="Home" />
 * <CustomBtn link="/game" name="Game" />
 * ```
 */
function CustomBtn({ link, name, ...props }: CustomBtnProps) {
  return (
    <NavLink
      to={link}
      className={({ isActive }) =>
        `px-4 py-2 rounded-full border-2 border-white transition duration-200 ${
          isActive
            ? "bg-white text-indigo-600 font-bold"
            : "text-white hover:bg-white hover:text-indigo-600"
        }`
      }
      {...props}
    >
      {name}
    </NavLink>
  );
}

export default CustomBtn;
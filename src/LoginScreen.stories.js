import LoginScreen from "./LoginScreen";
import { expect, userEvent, within } from '@storybook/test'
export default {
    component: LoginScreen,
    title: "LoginScreen",
    argTypes: {
        onLogIn: { action: "onLogIn" },
    },
};


export const Default = {}

export const WithCSSFocusState = {
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement)
      // Fill form fields before focusing on the submit button
      await userEvent.type(canvas.getByLabelText('email'), 'test@email.com');
      await userEvent.type(canvas.getByLabelText('password'), 'KC@2N6^?vsV+)w1t');
  
      // Emulates the user focusing on the submit button
      const SubmitButton = canvas.getByRole('button');
  
      await SubmitButton.focus()
      await expect(SubmitButton).toHaveFocus()
    },
  }
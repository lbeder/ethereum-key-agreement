declare module 'react-validation/build/form' {
  declare namespace Form {
    interface Props {
      children: React.ReactNode;
      className: string;
      onSubmit?: (event: MouseEvent<Element, MouseEvent>) => void;
    }
  }

  declare class Form extends React.Component<Form.Props> {}

  export as namespace Form;

  export = Form;
}

declare module 'react-validation/build/input' {
  declare namespace Input {
    interface Props {
      className: string;
      type: string;
      name: string;
      placeholder: string;
      value: string;
      validations?: ((value: string) => JSX.Element | undefined)[];
      onChange: (event: MouseEvent<Element, MouseEvent>) => void;
    }
  }

  declare class Input extends React.Component<Input.Props> {}

  export as namespace Input;

  export = Input;
}

declare module 'react-validation/build/button' {
  declare namespace Button {
    interface Props {
      className: string;
      type: string;
    }
  }

  declare class Button extends React.Component<Button.Props> {}

  export as namespace Button;

  export = Button;
}

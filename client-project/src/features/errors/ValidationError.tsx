import { Message } from 'semantic-ui-react';

interface Props {
  errors: string[];
}

export default function ValidationErrors({ errors }: Props) {
  return (
    <Message>
      {errors && (
        <Message.List style={{ color: '#cc0000' }}>
          {errors.map((err: string, i) => (
            <Message.Item key={i}>{err}</Message.Item>
          ))}
        </Message.List>
      )}
    </Message>
  );
}

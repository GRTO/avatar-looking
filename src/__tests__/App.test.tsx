import { render } from '@testing-library/react';

describe('App tests', () => {
  it('should contains the canvas element', () => {
    const rendered = render(<div />);
    expect(rendered.container).not.toBeNull();
  });
});

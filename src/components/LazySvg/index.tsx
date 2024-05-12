import { ComponentProps } from 'react';

import useLazySvg from '@/hooks/useLazySvg';

interface ILazySvgProps extends ComponentProps<'svg'> {
  name: string;
}

const LazySvg = ({ name, ...props }: ILazySvgProps) => {
  const { loading, error, Svg } = useLazySvg(name);

  if (error) {
    return null;
  }

  if (loading) {
    return null;
  }

  if (!Svg) {
    return null;
  }

  return <Svg {...props} />;
};

export default LazySvg;

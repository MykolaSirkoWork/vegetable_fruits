/* eslint-disable react/require-default-props */
import React from 'react';
import './Loader.scss';
import classNames from 'classnames';

interface Props {
  classToAdd?: string
}

export const Loader: React.FC<Props> = ({ classToAdd }) => (
  <div className={classNames('loader', {
    'loader--form': classToAdd === 'loader--form',
  })}
  >
    <div className="loader__content" />
  </div>
);

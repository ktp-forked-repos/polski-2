/* eslint-disable no-undef */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-enable no-unused-vars */
import React, { Component } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import '../styles/SkillBadge.css'

interface IProps {
  active: boolean,
  id: number,
  name: string,
}

const SkillBadge = ({ name, id, active }: IProps) => {
  const badge = active
    ? 
    <LinkContainer to={active ? `/skill/${id}` : ''}>
      <div className={`skill center-block skill-${active ? 'active' : 'inactive'}`}>
        &nbsp;
      </div>
    </LinkContainer>
    : 
    <div>
      <div className={`skill center-block skill-${active ? 'active' : 'inactive'}`}>
        &nbsp;
      </div>
    </div>

  return (
    <React.Fragment>
      {badge}
      <div className="label">
        {name}
      </div>
    </React.Fragment>
  )
}

export default SkillBadge
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import ModalStepper from 'components/ModalStepper'
import { CONFIRM_STEPS } from './model'
import { prop } from 'ramda'

import { Image, Modal, ModalBody, Text } from 'blockchain-info-components'

const Title = styled.div`
  text-align: center;
  margin-bottom: 20px;
`

const Content = styled.div`
  text-align: center;
  margin-bottom: 20px;
`

const ImageContainer = styled.div`
  position: relative;
`
const MarqueeContainer = styled.marquee.attrs({
  scrollamount: 3,
  behavior: 'alternate'
})`
  position: absolute;
  padding: 4px;
  width: 32%;
  left: 43%;
  top: 50%;
`

const PromptLockbox = props => {
  const { position, total, close, ...rest } = props
  const { coin, currentConnection, marquees } = rest
  const { error, ready, success } = currentConnection

  let step
  if (error) {
    step = prop('name', CONFIRM_STEPS.error)
  } else if (success) {
    step = prop('name', CONFIRM_STEPS.success)
  } else if (ready) {
    step = prop('name', CONFIRM_STEPS.ready)
  } else {
    step = prop('name', CONFIRM_STEPS.connect)
  }

  let currentStep = prop('index', CONFIRM_STEPS[step])

  return (
    <Modal size='small' position={position} total={total} closeButton={false}>
      <ModalStepper currentStep={currentStep} totalSteps={3} />
      <ModalBody>
        <Title>
          <Text>{CONFIRM_STEPS[step].title()}</Text>
        </Title>
        <Content>
          <Text color='gray-4'>{CONFIRM_STEPS[step].content(coin)}</Text>
        </Content>
        <ImageContainer>
          <Image
            width='100%'
            name={CONFIRM_STEPS[step].image()}
            srcset={CONFIRM_STEPS[step].srcset()}
          />
          <MarqueeContainer>
            {step === 'ready' &&
              marquees.map((marquee, i) => (
                <Text size='12px' weight={300}>
                  {i + 1 + '. ' + marquee}
                </Text>
              ))}
          </MarqueeContainer>
        </ImageContainer>
      </ModalBody>
    </Modal>
  )
}

PromptLockbox.propTypes = {
  coin: PropTypes.string
}

export default PromptLockbox

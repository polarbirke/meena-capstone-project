import styled from 'styled-components'

const VisuallyHidden = styled.span({
    position: 'absolute !important',
    width: '1px !important',
    height: '1px !important',
    margin: '0 !important',
    padding: '0 !important',
    border: '0 !important',
    overflow: 'hidden !important',
    clip: 'rect(0 0 0 0) !important',
})

export { VisuallyHidden };

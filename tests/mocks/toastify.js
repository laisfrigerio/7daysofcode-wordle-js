const TOASTIFY_SUCCESS_COLOR = '#538D4E'
const TOASTIFY_ERROR_COLOR = '#BA4747'
const TOASTIFY_WARNING_COLOR = '#B59F3B'

const toastifyDefaultConfig = {
    duration: 3000,
    newWindow: true,
    close: true,
    gravity: "top",
    position: "center",
    stopOnFocus: true,
    style: {
      boxShadow: "1px 3px 10px 0px #585858"
    }
}

const mockToastify = () => {
    return jest.fn().mockImplementation(() => {
        return {
            showToast: () => {}
        }
    })
}

const unMockToastify = () => {
    delete global.Toastify
}

module.exports = {
    mockToastify,
    unMockToastify,
    toastifyDefaultConfig,
    TOASTIFY_SUCCESS_COLOR,
    TOASTIFY_ERROR_COLOR,
    TOASTIFY_WARNING_COLOR
}

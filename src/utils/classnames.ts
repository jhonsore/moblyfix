function classNames(...classNamees: string[]) {
    return classNamees.filter(Boolean).join(' ')
}

export default classNames
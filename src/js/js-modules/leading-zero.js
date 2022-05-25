export default function addLeadingZero (value, digits = 2) {
    return String(value).padStart(digits, '0');
}
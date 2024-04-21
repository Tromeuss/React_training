export function Range ({value, onChange}) {
    return <div>
    <input 
        type="range"
        value={value} 
        className="form-range"
        min={0} 
        max={10}
        onChange={(e) => onChange(e.target.value)}/>
    </div>
}
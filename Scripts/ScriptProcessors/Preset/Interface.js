Content.makeFrontInterface(600, 575);

// Setup Constants
const var wetMax = 0.65;
const var saturationMax = 0.35;
const var preGainMax = 20;
const var reductionRatio = 0.85;

// Reverb settings
const var verbWetLevelMin = 0;
const var verbWetLevelMax = 0.5;
const var verbWidthMin = 0.8;
const var verbWidthMax = 1.0;
const var verbSizeMin = 0.2;
const var verbSizeMax = 0.5;

const var saturator = Synth.getEffect("Saturator1");
const var knbSaturation = Content.getComponent("knbSaturationGain");

const var knbReverb = Content.getComponent("knbReverb");
const var reverb = Synth.getEffect("reverb1");

const var ampMin = knbSaturation.get("min");
const var ampMax = knbSaturation.get("max");

const var knbReverbMin = knbReverb.get("min");
const var knbReverbMax = knbReverb.get("max");

const var ampRange = ampMax - ampMin;
const var knbVerbRange = knbReverbMax - knbReverbMin;

inline function onKnbSaturationControl(component, value)
{
	// Set Post Gain based on the PreGain value
	local preGainValue = (value / ampMax) * preGainMax;
	saturator.setAttribute(saturator.PreGain, preGainValue);
	saturator.setAttribute(saturator.PostGain, 0 - (preGainValue * reductionRatio));
	
	// Set Saturation / Wet Amount percentages within a predefined range
	local wetValue = (value - ampMin) / ampRange * wetMax;
	local saturationValue = (value - ampMin) / ampRange * saturationMax;
	
	saturator.setAttribute(saturator.WetAmount, wetValue);
	saturator.setAttribute(saturator.Saturation, saturationValue);
}

inline function onKnbReverbControl(component, value)
{
	// Set Reverb levels based on the Reverb knob value
	local wetLevel = verbWetLevelMin + (value - knbReverbMin) / knbVerbRange * (verbWetLevelMax - verbWetLevelMin);
	local width = verbWidthMin + (value - knbReverbMin) / knbVerbRange * (verbWidthMax - verbWidthMin);
	local size = verbSizeMin + (value - knbReverbMin) / knbVerbRange * (verbSizeMax - verbSizeMin);

	reverb.setAttribute(reverb.WetLevel, wetLevel);
	reverb.setAttribute(reverb.Width, width);
	reverb.setAttribute(reverb.RoomSize, size);
}

knbSaturation.setControlCallback(onKnbSaturationControl);
knbReverb.setControlCallback(onKnbReverbControl);function onNoteOn()
{
	
}
 function onNoteOff()
{
	
}
 function onController()
{
	
}
 function onTimer()
{
	
}
 function onControl(number, value)
{
	
}
 
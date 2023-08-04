--[[
      OBS Studio Lua script : Control the switches of the lower thirds with hotkeys
      Author: NoeAL
      Version: 0.2
      Released: 2020-09-28
--]]


local obs = obslua
local debug
local hk = {}
local hotkeyMasterSwitch = 0;
local hotkeySwitch1 = 0;
local hotkeySwitch2 = 0;
local hotkeySwitch3 = 0;
local hotkeySwitch4 = 0;
local hotkeyAlt1Slot1 = 0;
local hotkeyAlt1Slot2 = 0;
local hotkeyAlt1Slot3 = 0;
local hotkeyAlt1Slot4 = 0;
local hotkeyAlt1Slot5 = 0;
local hotkeyAlt1Slot6 = 0;
local hotkeyAlt1Slot7 = 0;
local hotkeyAlt1Slot8 = 0;
local hotkeyAlt1Slot9 = 0;
local hotkeyAlt1Slot10 = 0;
local hotkeyAlt2Slot1 = 0;
local hotkeyAlt2Slot2 = 0;
local hotkeyAlt2Slot3 = 0;
local hotkeyAlt2Slot4 = 0;
local hotkeyAlt2Slot5 = 0;
local hotkeyAlt2Slot6 = 0;
local hotkeyAlt2Slot7 = 0;
local hotkeyAlt2Slot8 = 0;
local hotkeyAlt2Slot9 = 0;
local hotkeyAlt2Slot10 = 0;
local hotkeyAlt3Slot1 = 0;
local hotkeyAlt3Slot2 = 0;
local hotkeyAlt3Slot3 = 0;
local hotkeyAlt3Slot4 = 0;
local hotkeyAlt3Slot5 = 0;
local hotkeyAlt3Slot6 = 0;
local hotkeyAlt3Slot7 = 0;
local hotkeyAlt3Slot8 = 0;
local hotkeyAlt3Slot9 = 0;
local hotkeyAlt3Slot10 = 0;
local hotkeyAlt4Slot1 = 0;
local hotkeyAlt4Slot2 = 0;
local hotkeyAlt4Slot3 = 0;
local hotkeyAlt4Slot4 = 0;
local hotkeyAlt4Slot5 = 0;
local hotkeyAlt4Slot6 = 0;
local hotkeyAlt4Slot7 = 0;
local hotkeyAlt4Slot8 = 0;
local hotkeyAlt4Slot9 = 0;
local hotkeyAlt4Slot10 = 0;


-- if you are extending the script, you can add more hotkeys here
-- then add actions in the 'onHotKey' function further below
local hotkeys = {
	A_SWITCH_0_main = "Main Switch",
	A_SWITCH_1 = "Lower Third Switch #1",
	A_SWITCH_2 = "Lower Third Switch #2",
	A_SWITCH_3 = "Lower Third Switch #3",
	A_SWITCH_4 = "Lower Third Switch #4",
	LT1_SLT01 = "Load Slot #1 on LT#1",
	LT1_SLT02 = "Load Slot #2 on LT#1",
	LT1_SLT03 = "Load Slot #3 on LT#1",
	LT1_SLT04 = "Load Slot #4 on LT#1",
	LT1_SLT05 = "Load Slot #5 on LT#1",
	LT1_SLT06 = "Load Slot #6 on LT#1",
	LT1_SLT07 = "Load Slot #7 on LT#1",
	LT1_SLT08 = "Load Slot #8 on LT#1",
	LT1_SLT09 = "Load Slot #9 on LT#1",
	LT1_SLT10 = "Load Slot #10 on LT#1",
	LT2_SLT01 = "Load Slot #1 on LT#2",
	LT2_SLT02 = "Load Slot #2 on LT#2",
	LT2_SLT03 = "Load Slot #3 on LT#2",
	LT2_SLT04 = "Load Slot #4 on LT#2",
	LT2_SLT05 = "Load Slot #5 on LT#2",
	LT2_SLT06 = "Load Slot #6 on LT#2",
	LT2_SLT07 = "Load Slot #7 on LT#2",
	LT2_SLT08 = "Load Slot #8 on LT#2",
	LT2_SLT09 = "Load Slot #9 on LT#2",
	LT2_SLT10 = "Load Slot #10 on LT#2",
	LT3_SLT01 = "Load Slot #1 on LT#3",
	LT3_SLT02 = "Load Slot #2 on LT#3",
	LT3_SLT03 = "Load Slot #3 on LT#3",
	LT3_SLT04 = "Load Slot #4 on LT#3",
	LT3_SLT05 = "Load Slot #5 on LT#3",
	LT3_SLT06 = "Load Slot #6 on LT#3",
	LT3_SLT07 = "Load Slot #7 on LT#3",
	LT3_SLT08 = "Load Slot #8 on LT#3",
	LT3_SLT09 = "Load Slot #9 on LT#3",
	LT3_SLT10 = "Load Slot #10 on LT#3",
	LT4_SLT01 = "Load Slot #1 on LT#4",
	LT4_SLT02 = "Load Slot #2 on LT#4",
	LT4_SLT03 = "Load Slot #3 on LT#4",
	LT4_SLT04 = "Load Slot #4 on LT#4",
	LT4_SLT05 = "Load Slot #5 on LT#4",
	LT4_SLT06 = "Load Slot #6 on LT#4",
	LT4_SLT07 = "Load Slot #7 on LT#4",
	LT4_SLT08 = "Load Slot #8 on LT#4",
	LT4_SLT09 = "Load Slot #9 on LT#4",
	LT4_SLT10 = "Load Slot #10 on LT#4",

}

local function ternary ( cond , T , F )
    if cond then return T else return F end
end

-- add any custom actions here
local function onHotKey(action)
	--obs.timer_remove(rotate)
	if debug then obs.script_log(obs.LOG_INFO, string.format("Hotkey : %s", action)) end

	hotkeyMasterSwitch = (action == "A_SWITCH_0_main") and 1 or 0;
	hotkeySwitch1 = (action == "A_SWITCH_1") and 1 or 0;
	hotkeySwitch2 = (action == "A_SWITCH_2") and 1 or 0;
	hotkeySwitch3 = (action == "A_SWITCH_3") and 1 or 0;
	hotkeySwitch4 = (action == "A_SWITCH_4") and 1 or 0;
	
	hotkeyAlt1Slot1 = (action == "LT1_SLT01") and 1 or 0;
	hotkeyAlt1Slot2 = (action == "LT1_SLT02") and 1 or 0;
	hotkeyAlt1Slot3 = (action == "LT1_SLT03") and 1 or 0;
	hotkeyAlt1Slot4 = (action == "LT1_SLT04") and 1 or 0;
	hotkeyAlt1Slot5 = (action == "LT1_SLT05") and 1 or 0;
	hotkeyAlt1Slot6 = (action == "LT1_SLT06") and 1 or 0;
	hotkeyAlt1Slot7 = (action == "LT1_SLT07") and 1 or 0;
	hotkeyAlt1Slot8 = (action == "LT1_SLT08") and 1 or 0;
	hotkeyAlt1Slot9 = (action == "LT1_SLT09") and 1 or 0;
	hotkeyAlt1Slot10 = (action == "LT1_SLT10") and 1 or 0;
	
	hotkeyAlt2Slot1 = (action == "LT2_SLT01") and 1 or 0;
	hotkeyAlt2Slot2 = (action == "LT2_SLT02") and 1 or 0;
	hotkeyAlt2Slot3 = (action == "LT2_SLT03") and 1 or 0;
	hotkeyAlt2Slot4 = (action == "LT2_SLT04") and 1 or 0;
	hotkeyAlt2Slot5 = (action == "LT2_SLT05") and 1 or 0;
	hotkeyAlt2Slot6 = (action == "LT2_SLT06") and 1 or 0;
	hotkeyAlt2Slot7 = (action == "LT2_SLT07") and 1 or 0;
	hotkeyAlt2Slot8 = (action == "LT2_SLT08") and 1 or 0;
	hotkeyAlt2Slot9 = (action == "LT2_SLT09") and 1 or 0;
	hotkeyAlt2Slot10 = (action == "LT2_SLT10") and 1 or 0;

	
	hotkeyAlt3Slot1 = (action == "LT3_SLT01") and 1 or 0;
	hotkeyAlt3Slot2 = (action == "LT3_SLT02") and 1 or 0;
	hotkeyAlt3Slot3 = (action == "LT3_SLT03") and 1 or 0;
	hotkeyAlt3Slot4 = (action == "LT3_SLT04") and 1 or 0;
	hotkeyAlt3Slot5 = (action == "LT3_SLT05") and 1 or 0;
	hotkeyAlt3Slot6 = (action == "LT3_SLT06") and 1 or 0;
	hotkeyAlt3Slot7 = (action == "LT3_SLT07") and 1 or 0;
	hotkeyAlt3Slot8 = (action == "LT3_SLT08") and 1 or 0;
	hotkeyAlt3Slot9 = (action == "LT3_SLT09") and 1 or 0;
	hotkeyAlt3Slot10 = (action == "LT3_SLT10") and 1 or 0;

	
	hotkeyAlt4Slot1 = (action == "LT4_SLT01") and 1 or 0;
	hotkeyAlt4Slot2 = (action == "LT4_SLT02") and 1 or 0;
	hotkeyAlt4Slot3 = (action == "LT4_SLT03") and 1 or 0;
	hotkeyAlt4Slot4 = (action == "LT4_SLT04") and 1 or 0;
	hotkeyAlt4Slot5 = (action == "LT4_SLT05") and 1 or 0;
	hotkeyAlt4Slot6 = (action == "LT4_SLT06") and 1 or 0;
	hotkeyAlt4Slot7 = (action == "LT4_SLT07") and 1 or 0;
	hotkeyAlt4Slot8 = (action == "LT4_SLT08") and 1 or 0;
	hotkeyAlt4Slot9 = (action == "LT4_SLT09") and 1 or 0;
	hotkeyAlt4Slot10 = (action == "LT4_SLT10") and 1 or 0;
	update_hotkeys_js();

	
end


-- write settings to js file
function update_hotkeys_js()
    local output = assert(io.open(script_path() .. '../common/js/hotkeys.js', "w"));
    output:write('hotKeys = {\n');
	output:write('  change: ' .. os.clock() .. ',\n');
	output:write('  switches: {\n');
	output:write('    master: ' .. hotkeyMasterSwitch .. ',\n');
	output:write('    lt0: ' .. hotkeySwitch1 .. ',\n');
	output:write('    lt1: ' .. hotkeySwitch2 .. ',\n');
	output:write('    lt2: ' .. hotkeySwitch3 .. ',\n');
	output:write('    lt3: ' .. hotkeySwitch4 .. ',\n');
	output:write('  },\n');
	output:write('  loadSlots: {\n');
	output:write('    lt0: {\n');
	output:write('      slot0: '.. hotkeyAlt1Slot1 .. ',\n');
	output:write('      slot1: '.. hotkeyAlt1Slot2 .. ',\n');
	output:write('      slot2: '.. hotkeyAlt1Slot3 .. ',\n');
	output:write('      slot3: '.. hotkeyAlt1Slot4 .. ',\n');
	output:write('      slot4: '.. hotkeyAlt1Slot5 .. ',\n');
	output:write('      slot5: '.. hotkeyAlt1Slot6 .. ',\n');
	output:write('      slot6: '.. hotkeyAlt1Slot7 .. ',\n');
	output:write('      slot7: '.. hotkeyAlt1Slot8 .. ',\n');
	output:write('      slot8: '.. hotkeyAlt1Slot9 .. ',\n');
	output:write('      slot9: '.. hotkeyAlt1Slot10 .. ',\n');
	output:write('    },\n');
	output:write('    lt1: {\n');
	output:write('      slot0: '.. hotkeyAlt2Slot1 .. ',\n');
	output:write('      slot1: '.. hotkeyAlt2Slot2 .. ',\n');
	output:write('      slot2: '.. hotkeyAlt2Slot3 .. ',\n');
	output:write('      slot3: '.. hotkeyAlt2Slot4 .. ',\n');
	output:write('      slot4: '.. hotkeyAlt2Slot5 .. ',\n');
	output:write('      slot5: '.. hotkeyAlt2Slot6 .. ',\n');
	output:write('      slot6: '.. hotkeyAlt2Slot7 .. ',\n');
	output:write('      slot7: '.. hotkeyAlt2Slot8 .. ',\n');
	output:write('      slot8: '.. hotkeyAlt2Slot9 .. ',\n');
	output:write('      slot9: '.. hotkeyAlt2Slot10 .. ',\n');
	output:write('    },\n');
	output:write('    lt2: {\n');
	output:write('      slot0: '.. hotkeyAlt3Slot1 .. ',\n');
	output:write('      slot1: '.. hotkeyAlt3Slot2 .. ',\n');
	output:write('      slot2: '.. hotkeyAlt3Slot3 .. ',\n');
	output:write('      slot3: '.. hotkeyAlt3Slot4 .. ',\n');
	output:write('      slot4: '.. hotkeyAlt3Slot5 .. ',\n');
	output:write('      slot5: '.. hotkeyAlt3Slot6 .. ',\n');
	output:write('      slot6: '.. hotkeyAlt3Slot7 .. ',\n');
	output:write('      slot7: '.. hotkeyAlt3Slot8 .. ',\n');
	output:write('      slot8: '.. hotkeyAlt3Slot9 .. ',\n');
	output:write('      slot9: '.. hotkeyAlt3Slot10 .. ',\n');
	output:write('    },\n');
	output:write('    lt3: {\n');
	output:write('      slot0: '.. hotkeyAlt4Slot1 .. ',\n');
	output:write('      slot1: '.. hotkeyAlt4Slot2 .. ',\n');
	output:write('      slot2: '.. hotkeyAlt4Slot3 .. ',\n');
	output:write('      slot3: '.. hotkeyAlt4Slot4 .. ',\n');
	output:write('      slot4: '.. hotkeyAlt4Slot5 .. ',\n');
	output:write('      slot5: '.. hotkeyAlt4Slot6 .. ',\n');
	output:write('      slot6: '.. hotkeyAlt4Slot7 .. ',\n');
	output:write('      slot7: '.. hotkeyAlt4Slot8 .. ',\n');
	output:write('      slot8: '.. hotkeyAlt4Slot9 .. ',\n');
	output:write('      slot9: '.. hotkeyAlt4Slot10 .. ',\n');
	output:write('    },\n');
	output:write('  },\n');
	output:write('};');
	output:close()
end

----------------------------------------------------------

-- called on startup
function script_load(settings)
	function pairsByKeys (t, f)
		local a = {}
		for n in pairs(t) do table.insert(a, n) end
		table.sort(a, f)
		local i = 0
		local iter = function ()
		  i = i + 1
		  if a[i] == nil then return nil
		  else return a[i], t[a[i]]
		  end
		end
		return iter
	end	

	for name, line in pairsByKeys(hotkeys) do
		hk[name] = obs.obs_hotkey_register_frontend(name, line, function(pressed) if pressed then onHotKey(name) end end)
		local hotkeyArray = obs.obs_data_get_array(settings, name)
		obs.obs_hotkey_load(hk[name], hotkeyArray)
		obs.obs_data_array_release(hotkeyArray)
	end	
	update_hotkeys_js()
end


-- called on unload
function script_unload()
end


-- called when settings changed
function script_update(settings)
	debug = obs.obs_data_get_bool(settings, "debug")
end


-- return description shown to user
function script_description()
	return "Control the switches of the lower thirds with hotkeys"
end


-- define properties that user can change
function script_properties()
	local props = obs.obs_properties_create()
	obs.obs_properties_add_bool(props, "debug", "Debug")
	return props
end


-- set default values
function script_defaults(settings)
	obs.obs_data_set_default_bool(settings, "debug", false)
end


-- save additional data not set by user
function script_save(settings)
	for k, v in pairs(hotkeys) do
		local hotkeyArray = obs.obs_hotkey_save(hk[k])
		obs.obs_data_set_array(settings, k, hotkeyArray)
		obs.obs_data_array_release(hotkeyArray)
	end
end
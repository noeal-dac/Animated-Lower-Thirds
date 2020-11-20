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

-- add any custom actions here
local function onHotKey(action)
	--obs.timer_remove(rotate)
	if debug then obs.script_log(obs.LOG_INFO, string.format("Hotkey : %s", action)) end

	if action == "A_SWITCH_0_main" then
		if hotkeyMasterSwitch == 0 then
			hotkeyMasterSwitch = 1
		else
			hotkeyMasterSwitch = 0
		end
		update_hotkeys_js()
	elseif action == "A_SWITCH_1" then
		if hotkeySwitch1 == 0 then
			hotkeySwitch1 = 1
		else
			hotkeySwitch1 = 0
		end
		update_hotkeys_js()
	elseif action == "A_SWITCH_2" then
		if hotkeySwitch2 == 0 then
			hotkeySwitch2 = 1
		else
			hotkeySwitch2 = 0
		end
		update_hotkeys_js()
	elseif action == "A_SWITCH_3" then
		if hotkeySwitch3 == 0 then
			hotkeySwitch3 = 1
		else
			hotkeySwitch3 = 0
		end
		update_hotkeys_js()
	elseif action == "A_SWITCH_4" then
		if hotkeySwitch4 == 0 then
			hotkeySwitch4 = 1
		else
			hotkeySwitch4 = 0
		end
		update_hotkeys_js()
	elseif action == "LT1_SLT01" then
		if hotkeyAlt1Slot1 == 0 then
			hotkeyAlt1Slot1 = 1
		else
			hotkeyAlt1Slot1 = 0
		end
		update_hotkeys_js()
	elseif action == "LT1_SLT02" then
		if hotkeyAlt1Slot2 == 0 then
			hotkeyAlt1Slot2 = 1
		else
			hotkeyAlt1Slot2 = 0
		end
		update_hotkeys_js()
	elseif action == "LT1_SLT03" then
		if hotkeyAlt1Slot3 == 0 then
			hotkeyAlt1Slot3 = 1
		else
			hotkeyAlt1Slot3 = 0
		end
		update_hotkeys_js()
	elseif action == "LT1_SLT04" then
		if hotkeyAlt1Slot4 == 0 then
			hotkeyAlt1Slot4 = 1
		else
			hotkeyAlt1Slot4 = 0
		end
		update_hotkeys_js()
	elseif action == "LT1_SLT05" then
		if hotkeyAlt1Slot5 == 0 then
			hotkeyAlt1Slot5 = 1
		else
			hotkeyAlt1Slot5 = 0
		end
		update_hotkeys_js()
	elseif action == "LT1_SLT06" then
		if hotkeyAlt1Slot6 == 0 then
			hotkeyAlt1Slot6 = 1
		else
			hotkeyAlt1Slot6 = 0
		end
		update_hotkeys_js()
	elseif action == "LT1_SLT07" then
		if hotkeyAlt1Slot7 == 0 then
			hotkeyAlt1Slot7 = 1
		else
			hotkeyAlt1Slot7 = 0
		end
		update_hotkeys_js()
	elseif action == "LT1_SLT08" then
		if hotkeyAlt1Slot8 == 0 then
			hotkeyAlt1Slot8 = 1
		else
			hotkeyAlt1Slot8 = 0
		end
		update_hotkeys_js()
	elseif action == "LT1_SLT09" then
		if hotkeyAlt1Slot9 == 0 then
			hotkeyAlt1Slot9 = 1
		else
			hotkeyAlt1Slot9 = 0
		end
		update_hotkeys_js()
	elseif action == "LT1_SLT10" then
		if hotkeyAlt1Slot10 == 0 then
			hotkeyAlt1Slot10 = 1
		else
			hotkeyAlt1Slot10 = 0
		end
		update_hotkeys_js()
	elseif action == "LT2_SLT01" then
		if hotkeyAlt2Slot1 == 0 then
			hotkeyAlt2Slot1 = 1
		else
			hotkeyAlt2Slot1 = 0
		end
		update_hotkeys_js()
	elseif action == "LT2_SLT02" then
		if hotkeyAlt2Slot2 == 0 then
			hotkeyAlt2Slot2 = 1
		else
			hotkeyAlt2Slot2 = 0
		end
		update_hotkeys_js()
	elseif action == "LT2_SLT03" then
		if hotkeyAlt2Slot3 == 0 then
			hotkeyAlt2Slot3 = 1
		else
			hotkeyAlt2Slot3 = 0
		end
		update_hotkeys_js()
	elseif action == "LT2_SLT04" then
		if hotkeyAlt2Slot4 == 0 then
			hotkeyAlt2Slot4 = 1
		else
			hotkeyAlt2Slot4 = 0
		end
		update_hotkeys_js()
	elseif action == "LT2_SLT05" then
		if hotkeyAlt2Slot5 == 0 then
			hotkeyAlt2Slot5 = 1
		else
			hotkeyAlt2Slot5 = 0
		end
		update_hotkeys_js()
	elseif action == "LT2_SLT06" then
		if hotkeyAlt2Slot6 == 0 then
			hotkeyAlt2Slot6 = 1
		else
			hotkeyAlt2Slot6 = 0
		end
		update_hotkeys_js()
	elseif action == "LT2_SLT07" then
		if hotkeyAlt2Slot7 == 0 then
			hotkeyAlt2Slot7 = 1
		else
			hotkeyAlt2Slot7 = 0
		end
		update_hotkeys_js()
	elseif action == "LT2_SLT08" then
		if hotkeyAlt2Slot8 == 0 then
			hotkeyAlt2Slot8 = 1
		else
			hotkeyAlt2Slot8 = 0
		end
		update_hotkeys_js()
	elseif action == "LT2_SLT09" then
		if hotkeyAlt2Slot9 == 0 then
			hotkeyAlt2Slot9 = 1
		else
			hotkeyAlt2Slot9 = 0
		end
		update_hotkeys_js()
	elseif action == "LT2_SLT10" then
		if hotkeyAlt2Slot10 == 0 then
			hotkeyAlt2Slot10 = 1
		else
			hotkeyAlt2Slot10 = 0
		end
		update_hotkeys_js()
	elseif action == "LT3_SLT01" then
		if hotkeyAlt3Slot1 == 0 then
			hotkeyAlt3Slot1 = 1
		else
			hotkeyAlt3Slot1 = 0
		end
		update_hotkeys_js()
	elseif action == "LT3_SLT02" then
		if hotkeyAlt3Slot2 == 0 then
			hotkeyAlt3Slot2 = 1
		else
			hotkeyAlt3Slot2 = 0
		end
		update_hotkeys_js()
	elseif action == "LT3_SLT03" then
		if hotkeyAlt3Slot3 == 0 then
			hotkeyAlt3Slot3 = 1
		else
			hotkeyAlt3Slot3 = 0
		end
		update_hotkeys_js()
	elseif action == "LT3_SLT04" then
		if hotkeyAlt3Slot4 == 0 then
			hotkeyAlt3Slot4 = 1
		else
			hotkeyAlt3Slot4 = 0
		end
		update_hotkeys_js()
	elseif action == "LT3_SLT05" then
		if hotkeyAlt3Slot5 == 0 then
			hotkeyAlt3Slot5 = 1
		else
			hotkeyAlt3Slot5 = 0
		end
		update_hotkeys_js()
	elseif action == "LT3_SLT06" then
		if hotkeyAlt3Slot6 == 0 then
			hotkeyAlt3Slot6 = 1
		else
			hotkeyAlt3Slot6 = 0
		end
		update_hotkeys_js()
	elseif action == "LT3_SLT07" then
		if hotkeyAlt3Slot7 == 0 then
			hotkeyAlt3Slot7 = 1
		else
			hotkeyAlt3Slot7 = 0
		end
		update_hotkeys_js()
	elseif action == "LT3_SLT08" then
		if hotkeyAlt3Slot8 == 0 then
			hotkeyAlt3Slot8 = 1
		else
			hotkeyAlt3Slot8 = 0
		end
		update_hotkeys_js()
	elseif action == "LT3_SLT09" then
		if hotkeyAlt3Slot9 == 0 then
			hotkeyAlt3Slot9 = 1
		else
			hotkeyAlt3Slot9 = 0
		end
		update_hotkeys_js()
	elseif action == "LT3_SLT10" then
		if hotkeyAlt3Slot10 == 0 then
			hotkeyAlt3Slot10 = 1
		else
			hotkeyAlt3Slot10 = 0
		end
		update_hotkeys_js()
	elseif action == "LT4_SLT01" then
		if hotkeyAlt4Slot1 == 0 then
			hotkeyAlt4Slot1 = 1
		else
			hotkeyAlt4Slot1 = 0
		end
		update_hotkeys_js()
	elseif action == "LT4_SLT02" then
		if hotkeyAlt4Slot2 == 0 then
			hotkeyAlt4Slot2 = 1
		else
			hotkeyAlt4Slot2 = 0
		end
		update_hotkeys_js()
	elseif action == "LT4_SLT03" then
		if hotkeyAlt4Slot3 == 0 then
			hotkeyAlt4Slot3 = 1
		else
			hotkeyAlt4Slot3 = 0
		end
		update_hotkeys_js()
	elseif action == "LT4_SLT04" then
		if hotkeyAlt4Slot4 == 0 then
			hotkeyAlt4Slot4 = 1
		else
			hotkeyAlt4Slot4 = 0
		end
		update_hotkeys_js()
	elseif action == "LT4_SLT05" then
		if hotkeyAlt4Slot5 == 0 then
			hotkeyAlt4Slot5 = 1
		else
			hotkeyAlt4Slot5 = 0
		end
		update_hotkeys_js()
	elseif action == "LT4_SLT06" then
		if hotkeyAlt4Slot6 == 0 then
			hotkeyAlt4Slot6 = 1
		else
			hotkeyAlt4Slot6 = 0
		end
		update_hotkeys_js()
	elseif action == "LT4_SLT07" then
		if hotkeyAlt4Slot7 == 0 then
			hotkeyAlt4Slot7 = 1
		else
			hotkeyAlt4Slot7 = 0
		end
		update_hotkeys_js()
	elseif action == "LT4_SLT08" then
		if hotkeyAlt4Slot8 == 0 then
			hotkeyAlt4Slot8 = 1
		else
			hotkeyAlt4Slot8 = 0
		end
		update_hotkeys_js()
	elseif action == "LT4_SLT09" then
		if hotkeyAlt4Slot9 == 0 then
			hotkeyAlt4Slot9 = 1
		else
			hotkeyAlt4Slot9 = 0
		end
		update_hotkeys_js()
	elseif action == "LT4_SLT10" then
		if hotkeyAlt4Slot10 == 0 then
			hotkeyAlt4Slot10 = 1
		else
			hotkeyAlt4Slot10 = 0
		end
		update_hotkeys_js()
	end
end


-- write settings to js file
function update_hotkeys_js()
    local output = assert(io.open(script_path() .. '../common/js/hotkeys.js', "w"))
    output:write('hotkeyMasterSwitch = '.. hotkeyMasterSwitch .. ';\n')
    output:write('hotkeySwitch1 = '.. hotkeySwitch1 .. ';\n')
    output:write('hotkeySwitch2 = '.. hotkeySwitch2 .. ';\n')
    output:write('hotkeySwitch3 = '.. hotkeySwitch3 .. ';\n')
	output:write('hotkeySwitch4 = '.. hotkeySwitch4 .. ';\n')
	output:write('hotkeyAlt1Slot1 = '.. hotkeyAlt1Slot1 .. ';\n')
	output:write('hotkeyAlt1Slot2 = '.. hotkeyAlt1Slot2 .. ';\n')
	output:write('hotkeyAlt1Slot3 = '.. hotkeyAlt1Slot3 .. ';\n')
	output:write('hotkeyAlt1Slot4 = '.. hotkeyAlt1Slot4 .. ';\n')
	output:write('hotkeyAlt1Slot5 = '.. hotkeyAlt1Slot5 .. ';\n')
	output:write('hotkeyAlt1Slot6 = '.. hotkeyAlt1Slot6 .. ';\n')
	output:write('hotkeyAlt1Slot7 = '.. hotkeyAlt1Slot7 .. ';\n')
	output:write('hotkeyAlt1Slot8 = '.. hotkeyAlt1Slot8 .. ';\n')
	output:write('hotkeyAlt1Slot9 = '.. hotkeyAlt1Slot9 .. ';\n')
	output:write('hotkeyAlt1Slot10 = '.. hotkeyAlt1Slot10 .. ';\n')
	output:write('hotkeyAlt2Slot1 = '.. hotkeyAlt2Slot1 .. ';\n')
	output:write('hotkeyAlt2Slot2 = '.. hotkeyAlt2Slot2 .. ';\n')
	output:write('hotkeyAlt2Slot3 = '.. hotkeyAlt2Slot3 .. ';\n')
	output:write('hotkeyAlt2Slot4 = '.. hotkeyAlt2Slot4 .. ';\n')
	output:write('hotkeyAlt2Slot5 = '.. hotkeyAlt2Slot5 .. ';\n')
	output:write('hotkeyAlt2Slot6 = '.. hotkeyAlt2Slot6 .. ';\n')
	output:write('hotkeyAlt2Slot7 = '.. hotkeyAlt2Slot7 .. ';\n')
	output:write('hotkeyAlt2Slot8 = '.. hotkeyAlt2Slot8 .. ';\n')
	output:write('hotkeyAlt2Slot9 = '.. hotkeyAlt2Slot9 .. ';\n')
	output:write('hotkeyAlt2Slot10 = '.. hotkeyAlt2Slot10 .. ';\n')
	output:write('hotkeyAlt3Slot1 = '.. hotkeyAlt3Slot1 .. ';\n')
	output:write('hotkeyAlt3Slot2 = '.. hotkeyAlt3Slot2 .. ';\n')
	output:write('hotkeyAlt3Slot3 = '.. hotkeyAlt3Slot3 .. ';\n')
	output:write('hotkeyAlt3Slot4 = '.. hotkeyAlt3Slot4 .. ';\n')
	output:write('hotkeyAlt3Slot5 = '.. hotkeyAlt3Slot5 .. ';\n')
	output:write('hotkeyAlt3Slot6 = '.. hotkeyAlt3Slot6 .. ';\n')
	output:write('hotkeyAlt3Slot7 = '.. hotkeyAlt3Slot7 .. ';\n')
	output:write('hotkeyAlt3Slot8 = '.. hotkeyAlt3Slot8 .. ';\n')
	output:write('hotkeyAlt3Slot9 = '.. hotkeyAlt3Slot9 .. ';\n')
	output:write('hotkeyAlt3Slot10 = '.. hotkeyAlt3Slot10 .. ';\n')
	output:write('hotkeyAlt4Slot1 = '.. hotkeyAlt4Slot1 .. ';\n')
	output:write('hotkeyAlt4Slot2 = '.. hotkeyAlt4Slot2 .. ';\n')
	output:write('hotkeyAlt4Slot3 = '.. hotkeyAlt4Slot3 .. ';\n')
	output:write('hotkeyAlt4Slot4 = '.. hotkeyAlt4Slot4 .. ';\n')
	output:write('hotkeyAlt4Slot5 = '.. hotkeyAlt4Slot5 .. ';\n')
	output:write('hotkeyAlt4Slot6 = '.. hotkeyAlt4Slot6 .. ';\n')
	output:write('hotkeyAlt4Slot7 = '.. hotkeyAlt4Slot7 .. ';\n')
	output:write('hotkeyAlt4Slot8 = '.. hotkeyAlt4Slot8 .. ';\n')
	output:write('hotkeyAlt4Slot9 = '.. hotkeyAlt4Slot9 .. ';\n')
	output:write('hotkeyAlt4Slot10 = '.. hotkeyAlt4Slot10 .. ';\n')
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
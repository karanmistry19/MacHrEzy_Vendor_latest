# Macleods

--Add in appStack.js line 305 Qr Code Component:"<TouchableOpacity
										onPress={() => {
											setQrCodeScannerModal(true);
											/* Handle My Profile */
											setDropdownVisible(false);
										}}
										style={{
											flexDirection: "row",
											alignItems: "center",
											paddingVertical: 10,
											borderBottomWidth: 1,
											borderBottomColor: "#e0e0e0",
										}}
									>
										<Text style={{ fontSize: 16 }}>
											QR Code Scanner
										</Text>
									</TouchableOpacity>"
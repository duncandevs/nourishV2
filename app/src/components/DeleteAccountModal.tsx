import React from 'react';
import {
  Modal,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Text } from '../theme';


type DeleteAccountModalProps = {
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
};

export const DeleteAccountModal = ({ isOpen, onCancel, onConfirm }: DeleteAccountModalProps) => {
  return (
      <Modal
        visible={isOpen}
        transparent={true}
        onRequestClose={onCancel}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Delete Account</Text>
            <Text variant="paragraph4" style={styles.modalMessage}>
                Are you sure you want to delete your account?
                This action will permanently erase all your data, settings, and preferences.
            </Text>
            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.confirmButton} onPress={onConfirm}>
                <Text style={styles.buttonText}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    // marginTop: '45%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    // borderColor: 'black',
    // borderWidth: 3,'
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  modalMessage: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  cancelButton: {
    backgroundColor: '#81c784',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 10,
    alignItems: 'center',
  },
  confirmButton: {
    backgroundColor: '#e57373',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginLeft: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

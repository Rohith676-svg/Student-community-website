import React, { useState, useEffect, useCallback } from 'react';
import { membersService } from '../../services/membersService';
import MembersToolbar from './MembersToolbar';
import MembersTable from './MembersTable';
import MemberDetailsModal from './MemberDetailsModal';
import { TableSkeleton } from '../common/LoadingSkeleton';

export default function MembersPage({ onShowToast }) {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [search, setSearch] = useState('');
  const [department, setDepartment] = useState('ALL');
  const [year, setYear] = useState('ALL');
  const [status, setStatus] = useState('ALL');

  // Modal inspection
  const [selectedMember, setSelectedMember] = useState(null);

  const fetchMembers = useCallback(async () => {
    try {
      setLoading(true);
      const data = await membersService.getMembers({ search, department, year, status });
      setMembers(data);
    } catch (err) {
      console.error(err);
      if (onShowToast) onShowToast('Failed to load members', 'error');
    } finally {
      setLoading(false);
    }
  }, [search, department, year, status, onShowToast]);

  useEffect(() => {
    fetchMembers();
  }, [fetchMembers]);

  const handleToggleStatus = async (id, newStatus) => {
    try {
      await membersService.updateMemberStatus(id, newStatus);
      if (onShowToast) onShowToast(`Member status updated to ${newStatus}`);
      fetchMembers();
      if (selectedMember && selectedMember.id === id) {
        setSelectedMember((prev) => (prev ? { ...prev, status: newStatus } : null));
      }
    } catch {
      if (onShowToast) onShowToast('Failed to update member status', 'error');
    }
  };

  const handleDeleteMember = async (id) => {
    try {
      await membersService.deleteMember(id);
      if (onShowToast) onShowToast('Member removed successfully');
      fetchMembers();
    } catch {
      if (onShowToast) onShowToast('Failed to remove member', 'error');
    }
  };

  return (
    <div>
      <div className="admin-page-header">
        <div className="admin-page-header__left">
          <span className="admin-page-header__eyebrow">COMMUNITY DIRECTORY</span>
          <h1 className="admin-page-header__title">Members</h1>
          <p className="admin-page-header__desc">
            Registered students, academic branches, and active community status
          </p>
        </div>
      </div>

      <MembersToolbar
        search={search}
        onSearchChange={setSearch}
        department={department}
        onDepartmentChange={setDepartment}
        year={year}
        onYearChange={setYear}
        status={status}
        onStatusChange={setStatus}
        totalCount={members.length}
      />

      {loading ? (
        <TableSkeleton rows={6} cols={7} />
      ) : (
        <MembersTable
          members={members}
          onViewMember={(m) => setSelectedMember(m)}
          onToggleStatus={handleToggleStatus}
        />
      )}

      <MemberDetailsModal
        isOpen={!!selectedMember}
        onClose={() => setSelectedMember(null)}
        member={selectedMember}
        onToggleStatus={handleToggleStatus}
        onDelete={handleDeleteMember}
      />
    </div>
  );
}
